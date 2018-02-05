import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import './Suggester.css';

// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
    {
      title: '1970s',
      languages: [
        {
          name: 'C',
          year: 1972
        }
      ]
    },
    {
      title: '1980s',
      languages: [
        {
          name: 'C++',
          year: 1983
        },
        {
          name: 'Perl',
          year: 1987
        }
      ]
    },
    {
      title: '1990s',
      languages: [
        {
          name: 'Haskell',
          year: 1990
        },
        {
          name: 'Python',
          year: 1991
        },
        {
          name: 'Java',
          year: 1995
        },
        {
          name: 'Javascript',
          year: 1995
        },
        {
          name: 'PHP',
          year: 1995
        },
        {
          name: 'Ruby',
          year: 1995
        }
      ]
    },
    {
      title: '2000s',
      languages: [
        {
          name: 'C#',
          year: 2000
        },
        {
          name: 'Scala',
          year: 2003
        },
        {
          name: 'Clojure',
          year: 2007
        },
        {
          name: 'Go',
          year: 2009
        }
      ]
    },
    {
      title: '2010s',
      languages: [
        {
          name: 'Elm',
          year: 2012
        }
      ]
    }
  ];

// Teach Autosuggest how to calculate suggestions for any given input value.
/*const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};*/
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value, reason) {
    console.log(value,reason);
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return languages
        .map(section => {
            return {
                title: section.title,
                languages: section.languages.filter(language => regex.test(language.name))
            };
        })
        .filter(section => section.languages.length > 0);
}

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);


class SuggesterBox extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      isAsc: true
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value, reason }) => {
    this.setState({
      suggestions: getSuggestions(value,reason)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onBtnClicked = () => {
    this.setState({
      isAsc: !this.state.isAsc
      });
    this.onSuggestionsFetchRequested( {value:this.state.value,reason:"sort-order"});
  }

  renderSectionTitle = (section) => {
    return (
      <strong>{section.title}</strong>
    );
  }
  
  getSectionSuggestions = (section) => {
    return section.languages;
  }

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
    <div> 
        <div>{this.state.isAsc?"Yes":"No"}</div>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        sortBtn={true}
        onBtnClicked={this.onBtnClicked}
        multiSection={true}
        renderSectionTitle={this.renderSectionTitle}
        getSectionSuggestions={this.getSectionSuggestions}
        disclaimer="Test"
      />
      </div>
    );
  }
}

export default SuggesterBox;