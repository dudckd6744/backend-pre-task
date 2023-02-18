import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  DatePicker,
} from 'antd';

const DataBinder = (props) => {
  const { type, ...rest } = props;

  switch (type) {
    case 'date':
      return (<DatePicker format="YYYY.MM.DD" {...rest} />);
    case 'phone':
    case 'email':
    case 'text':
    default:
      return (<Input {...rest} />);
  }
};

DataBinder.propTypes = {
  type: PropTypes.oneOf(['text', 'date', 'email', 'phone', 'list']),
  disabled: PropTypes.bool,
};

export default DataBinder;
