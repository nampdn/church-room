import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DashboardPage } from 'src/features/dashboard/DashboardPage';

describe('dashboard/DashboardPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      dashboard: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DashboardPage {...props} />
    );

    expect(
      renderedComponent.find('.dashboard-dashboard-page').getElement()
    ).to.exist;
  });
});
