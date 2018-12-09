import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Moment from 'moment';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Button, ButtonGroup } from 'reactstrap';
import CreateSlotsModal from './CreateSlotsModal';

class UserQueueDetails extends Component {
  constructor(props) {
    super(props);

    this.fetchQueue = this.fetchQueue.bind(this);
    this.fetchAppointments = this.fetchAppointments.bind(this);
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
      .then(({ data: appointments }) => {
        console.log(appointments);
        this.setState({ appointments });
      })
      .catch((error) => {
        this.setState({ appointments: [] });
        console.log(error);
      });
  }

  toggleCreateSlotsModal() {
    const { isCreateSlotsModalOpen } = this.state;
    this.setState({ isCreateSlotsModalOpen: !isCreateSlotsModalOpen });
  }

  render() {
    const { queue, appointments, isCreateSlotsModalOpen } = this.state;
    if (!queue) return null;

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
              accessor: 'status',
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
