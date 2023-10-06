import { Component } from 'react';
import { Section, Title } from './App.styled';
import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onChangeFilterValue = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  onAddContact = newContact => {
    if (
      this.state.contacts.find(
        ({ name }) =>
          name.toLocaleLowerCase() === newContact.name.toLocaleLowerCase()
      )
    ) {
      window.alert(`${newContact.name} is already in contacts.`);
      return;
    }
    this.setState({
      contacts: [...this.state.contacts, newContact],
    });
  };

  onDeleateContact = id => {
    console.log(id);
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  render() {
    const { filter, contacts } = this.state;
    let filtredContacts = contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );

    return (
      <Section>
        <Title>Phonebook</Title>
        <ContactForm onAddContact={this.onAddContact} />

        <Title>Contacts</Title>
        <Filter
          filterValue={filter}
          onChangeFilterValue={this.onChangeFilterValue}
        />
        <ContactList
          contacts={filtredContacts}
          onDeleateContact={this.onDeleateContact}
        />
      </Section>
    );
  }
}
