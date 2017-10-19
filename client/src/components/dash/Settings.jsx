import React, { Component } from 'react';
import axios from 'axios';

export default class Settings extends Component {


  render(props) {

/*
    var options = [
        {
            name: 'This is option A',
            code: 'a'
        },
        {
            description: 'This is option B',
            code: 'b'
        },
        {
            description: 'This is option C',
            code: 'c'
        },
        {
            description: 'This is option D',
            code: 'd'
        }
    ];
*/


	if (this.props.coinbase.paymentMethods){
		var options = this.props.coinbase.paymentMethods;
	}else{
		var options = [];
	}

	if (this.props.coinbase.paymentMethods){
		var options2 = this.props.coinbase.accounts;
	}else{
		var options2 = [];
	}


    var dropDownOnChange = function(change) {

	axios.get('/login').then((users) => {
      this.setState({change: change});
    });
        alert('onChangeForSelect:\noldValue: ' + 
                change.oldValue + 
                '\nnewValue: ' 
                + change.newValue);
    };


var Dropdown = React.createClass({

    propTypes: {
        id: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired,
        value: React.PropTypes.oneOfType(
            [
                React.PropTypes.number,
                React.PropTypes.string
            ]
        ),
        valueField: React.PropTypes.string,
        labelField: React.PropTypes.string,
        onChange: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            value: null,
            valueField: 'value',
            labelField: 'label',
            onChange: null
        };
    },

    getInitialState: function() {
        var selected = this.getSelectedFromProps(this.props);
        return {
            selected: selected
        }
    },
    
    componentWillReceiveProps: function(nextProps) {
        var selected = this.getSelectedFromProps(nextProps);
        this.setState({
           selected: selected
        });
    },
    
    getSelectedFromProps(props) {
        var selected;
        if (props.value === null && props.options.length !== 0) {
            selected = props.options[0][props.valueField];
        } else {
            selected = props.value;
        }
        return selected;
    },

    render: function() {
        var self = this;
        var options = self.props.options.map(function(option) {
            return (
                <option key={option[self.props.valueField]} value={option[self.props.valueField]}>
                    {option[self.props.labelField]}
                </option>
            )
        });
        return (
            <select id={this.props.id} 
                    className='form-control' 
                    value={this.state.selected} 
                    onChange={this.handleChange}>
                {options}
            </select>
        )
    },

    handleChange: function(e) {
        if (this.props.onChange) {
            var change = {
              oldValue: this.state.selected,
              newValue: e.target.value
            }
            this.props.onChange(change);
        }
        this.setState({selected: e.target.value});
    }

});


var Dropdown2 = React.createClass({

    propTypes: {
        id: React.PropTypes.string.isRequired,
        options2: React.PropTypes.array.isRequired,
        value: React.PropTypes.oneOfType(
            [
                React.PropTypes.number,
                React.PropTypes.string
            ]
        ),
        valueField: React.PropTypes.string,
        labelField: React.PropTypes.string,
        onChange: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            value: null,
            valueField: 'value',
            labelField: 'label',
            onChange: null
        };
    },

    getInitialState: function() {
        var selected = this.getSelectedFromProps(this.props);
        return {
            selected: selected
        }
    },
    
    componentWillReceiveProps: function(nextProps) {
        var selected = this.getSelectedFromProps(nextProps);
        this.setState({
           selected: selected
        });
    },
    
    getSelectedFromProps(props) {
        var selected;
        if (props.value === null && props.options2.length !== 0) {
            selected = props.options2[0][props.valueField];
        } else {
            selected = props.value;
        }
        return selected;
    },

    render: function() {
        var self = this;
        var options2 = self.props.options2.map(function(option) {
            return (
                <option key={option[self.props.valueField]} value={option[self.props.valueField]}>
                    {option[self.props.labelField]}
                </option>
            )
        });
        return (
            <select id={this.props.id} 
                    className='form-control' 
                    value={this.state.selected} 
                    onChange={this.handleChange}>
                {options2}
            </select>
        )
    },

    handleChange: function(e) {
        if (this.props.onChange) {
            var change = {
              oldValue: this.state.selected,
              newValue: e.target.value
            }
            this.props.onChange(change);
        }
        this.setState({selected: e.target.value});
    }

});


    return (
      <div className="settings">
        <div className="table-hdr">
          <h3 className="coming-soon">Coming soon! We're working on it.</h3>
			<Dropdown id='myDropdown' options={options} value='b' labelField='name' valueField='id' onChange={dropDownOnChange}/>

			<Dropdown2 id='myDropdown2' options2={options2} value='b' labelField='name' valueField='id' onChange={dropDownOnChange}/>

        </div>
      </div>
    );
  }
}
