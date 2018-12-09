import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

function getDate(dateString) {
  const date = new Date(dateString);
  return `${date.getHours()}:${date.getMinutes()}`;
}

class UserQueueDetails extends Component {
  constructor(props) {
    super(props);

    this.fetchQueue = this.fetchQueue.bind(this);
    this.fetchAppointments = this.fetchAppointments.bind(this);

    this.state = {
      queue: null,
      appointments: [],
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
      .catch(error => console.log(error));
  }

  fetchAppointments() {
    const { queueId } = this.props;
    axios.get(`http://localhost:8080/v1/queue/${queueId}/appointments`)
      .then(({ data: appointments }) => this.setState({ appointments }))
      .catch(error => console.log(error));
  }

  render() {
    const { queue, appointments } = this.state;
    if (!queue) return null;

    return (
      <Fragment>
        <div className="mb-3">
          <h3>{queue.name}</h3>
          <div>{queue.description}</div>
          <div><small className="text-muted">{queue.address} / {queue.phoneNumber}</small></div>
        </div>

        <ReactTable
          data={appointments}
          columns={[
            {
              Header: 'Дата',
              id: 'date',
              accessor: a => moment(a.dateTimeTo).format('DD.MM.YYYY'),
            },
            {
              Header: 'Час з',
              id: 'timeFrom',
              accessor: a => moment(a.dateTimeFrom).format('HH:mm'),
            },
            {
              Header: 'Час до',
              id: 'timeTo',
              accessor: a => moment(a.dateTimeTo).format('HH:mm'),
            },
            {
              Header: 'Клієнт',
              columns: [
                {
                  Header: "Ім'я",
                  id: "name",
                  accessor: a => a.client && a.client.name,
                },
                {
                  Header: "Телефон",
                  id: "phoneNumber",
                  accessor: a => a.client && a.client.phoneNumber,
                },
                {
                  Header: "Пошта",
                  id: "email",
                  accessor: a => a.client && a.client.email,
                },
              ],
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          filterable
        />
      </Fragment>
    );
  }
}

UserQueueDetails.propTypes = {
  queueId: PropTypes.string.isRequired,
};

export default UserQueueDetails;
