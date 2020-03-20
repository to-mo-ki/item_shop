import React from "react";
import styled from 'styled-components';

export default class Title extends React.Component {
  render() {
    return (
      <Wrapper>
        <h1>{this.props.children}</h1>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  text-align: center;
`;
