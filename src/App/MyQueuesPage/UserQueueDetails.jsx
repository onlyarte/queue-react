import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Moment from 'moment';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Button, ButtonGroup, Badge } from 'reactstrap';
import CreateSlotsModal from './CreateSlotsModal';

class UserQueueDetails extends Component {
  constructor(props) {
    super(props);

    this.fetchQueue = this.fetchQueue.bind(this);
    this.fetchAppointments = this.fetchAppointments.bind(this);
    this.approveAppointment = this.approveAppointment.bind(this);
    this.cancelAppointment = this.cancelAppointment.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleCreateSlotsModal = this.toggleCreateSlotsModal.bind(this);

    this.state = {
      queue: null,
      appointments: [],
      isCreateSlotsModalOpen: false,
    };
  }

  componentDidMount() {
    this.fetchQueue();
    this.fetchAppointments();
  }

  componentDidUpdate(prevProps) {
    const { queueId } = this.props;
    if (prevProps.queueId !== queueId) {
      this.fetchQueue();
      this.fetchAppointments();
    }
  }

  fetchQueue() {
    const { queueId } = this.props;

    axios.get(`http://localhost:8080/v1/queue/${queueId}`)
      .then(({ data: queue }) => this.setState({ queue }))
      .catch((error) => {
        this.setState({ queue: null });
        console.log(error);
      });
  }

  fetchAppointments() {
    const { queueId } = this.props;

    axios.get(`http://localhost:8080/v1/queue/${queueId}/appointments`)
      .then(({ data: appointments }) => this.setState({ appointments }))
      .catch((error) => {
        this.setState({ appointments: [] });
        console.log(error);
      });
  }

  approveAppointment(appointmentId) {
    axios.patch(`http://localhost:8080/v1/appointment/${appointmentId}/approve`)
      .then(() => this.fetchAppointments())
      .catch(error => console.log(error));
  }

  cancelAppointment(appointmentId) {
    axios.patch(`http://localhost:8080/v1/appointment/${appointmentId}/cancel`)
      .then(() => this.fetchAppointments())
      .catch(error => console.log(error));
  }

  deleteAppointment(appointmentId) {
    axios.delete(`http://localhost:8080/v1/appointment/${appointmentId}`)
      .then(() => this.fetchAppointments())
      .catch(error => console.log(error));
  }

  toggleCreateSlotsModal() {
    const { isCreateSlotsModalOpen } = this.state;
    this.setState({ isCreateSlotsModalOpen: !isCreateSlotsModalOpen });
  }

  render() {
    const { queue, appointments, isCreateSlotsModalOpen } = this.state;
    if (!queue) return null;

    const getDeleteAppointmentBtn = appointmentId => (
      <Button type="button" color="secondary" size="sm" onClick={() => this.deleteAppointment(appointmentId)}>
        Видалити
      </Button>
    );

    const getApproveAppointmentBtn = appointmentId => (
      <Button type="button" color="success" size="sm" onClick={() => this.approveAppointment(appointmentId)}>
        Підтвердити
      </Button>
    );

    const getCancelAppointmentBtn = appointmentId => (
      <Button type="button" color="danger" size="sm" onClick={() => this.cancelAppointment(appointmentId)}>
        Скасувати
      </Button>
    );

    return (
      <div className="my-3 mt-5" id="details">
        <div className="mb-3">
          <h2>{queue.name}</h2>
          <div>{queue.description}</div>
          <div><small className="text-muted">{queue.address} / {queue.phoneNumber}</small></div>
        </div>

        <ButtonGroup className="mb-3">
          <Button color="primary" onClick={this.toggleCreateSlotsModal}>
            Додати слоти
          </Button>
        </ButtonGroup>

        <CreateSlotsModal
          queueId={queue.queueId}
          isOpen={isCreateSlotsModalOpen}
          onToggle={this.toggleCreateSlotsModal}
          onSlotsCreated={() => this.fetchAppointments()}
        />

        <ReactTable
          data={appointments}
          columns={[
            {
              Header: 'Слот',
              columns: [
                {
                  Header: 'Дата',
                  id: 'date',
                  accessor: a => new Moment(a.dateTimeTo).format('DD.MM.YYYY'),
                },
                {
                  Header: 'Час з',
                  id: 'timeFrom',
                  accessor: a => new Moment(a.dateTimeFrom).format('HH:mm'),
                },
                {
                  Header: 'Час до',
                  id: 'timeTo',
                  accessor: a => new Moment(a.dateTimeTo).format('HH:mm'),
                },
              ],
            },
            {
              Header: 'Клієнт',
              columns: [
                {
                  Header: 'Ім\'я',
                  id: 'name',
                  accessor: a => a.client && a.client.name,
                },
                {
                  Header: 'Телефон',
                  id: 'phoneNumber',
                  accessor: a => a.client && a.client.phoneNumber,
                },
                {
                  Header: 'Пошта',
                  id: 'email',
                  accessor: a => a.client && a.client.email,
                },
              ],
            },
            {
              Header: 'Статус',
              id: 'statusUkr',
              accessor: (appointment) => {
                switch (appointment.status) {
                  case 'CREATED':
                    return 'Вільно';
                  case 'REQUESTED':
                    return 'Не підтверджено';
                  case 'APPROVED':
                    return 'Підтверджено';
                  case 'CANCELLED':
                    return 'Скасовано';
                  default:
                    return null;
                }
              },
              Cell: ({ row: { _original: appointment } }) => {
                switch (appointment.status) {
                  case 'CREATED':
                    return <Badge color="secondary">Вільно</Badge>;
                  case 'REQUESTED':
                    return <Badge color="primary">Не підтверджено</Badge>;
                  case 'APPROVED':
                    return <Badge color="success">Підтверджено</Badge>;
                  case 'CANCELLED':
                    return <Badge color="secondary">Скасовано</Badge>;
                  default:
                    return null;
                }
              },
            },
            {
              Header: '',
              filterable: false,
              sortable: false,
              accessor: 'status',
              style: { padding: '3px 5px' },
              width: 120,
              Cell: ({ row: { _original: appointment } }) => {
                switch (appointment.status) {
                  case 'CREATED':
                    return getDeleteAppointmentBtn(appointment.appointmentId);
                  case 'REQUESTED':
                    return getApproveAppointmentBtn(appointment.appointmentId);
                  case 'APPROVED':
                    return getCancelAppointmentBtn(appointment.appointmentId);
                  default:
                    return null;
                }
              },
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          filterable
        />
      </div>
    );
  }
}

UserQueueDetails.propTypes = {
  queueId: PropTypes.string.isRequired,
};

export default UserQueueDetails;
