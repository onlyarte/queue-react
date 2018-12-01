import React from 'react';
import Octicon, { Search as SearchIcon } from '@githubprimer/octicons-react';

import {
  Form,
  InputGroup,
  InputGroupAddon,
  Button,
  Input,
} from 'reactstrap';

function SearchForm() {
  return (
    <Form>
      <InputGroup className="mb-2">
        <InputGroupAddon addonType="prepend">Черга</InputGroupAddon>
        <Input type="text" name="query" placeholder="стоматолог, Марина або що завгодно" />
      </InputGroup>

      <InputGroup className="mb-2">
        <InputGroupAddon addonType="prepend">Місто</InputGroupAddon>
        <Input type="text" name="location" placeholder="Київ..." />
      </InputGroup>

      <Button type="button" color="primary">
        <Octicon><SearchIcon x={10} /></Octicon>
        {' '}
        Шукати
      </Button>
    </Form>
  );
}

export default SearchForm;
