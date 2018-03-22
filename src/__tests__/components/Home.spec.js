import React from 'react';
import path from 'path';
import renderer from 'react-test-renderer';
import Home from '../../components/Home/Home';
import { StaticRouter } from 'react-router-dom';

const context = {};

describe('<Home />', () => {
  const snapshotFileName = path.join(__dirname, 'Home.spec.js.snap');
  test('Link matches snapshot', () => {
    const component = renderer.create(
      <StaticRouter context={context} location="/home/left">
        <Home />
      </StaticRouter>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot(snapshotFileName, 'home-with-route');
  });
});
