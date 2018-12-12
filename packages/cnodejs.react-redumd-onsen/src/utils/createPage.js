import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';

export default ({
  models,
  getInitialProps,
  mapStateToProps,
  mapDispatchToProps,
}) => Page => {
  const ConnectedPage = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Page);
  class WrappedPage extends PureComponent {
    static displayName = `createPage(${Page.displayName ||
      Page.name ||
      'Page'})`;

    static contextTypes = {
      store: PropTypes.object,
    };

    constructor(props) {
      super(props);

      this.state = {
        mounted: false,
      };
      this.models = null;
    }

    componentDidMount() {
      const { store } = this.context;
      if (store) {
        this.models = Object.keys(models).reduce((rcc, key) => {
          const model = new models[key](Date.now());
          store.model(model);
          rcc[key] = model;
          return rcc;
        }, {});
        getInitialProps({ props: this.props, store, models: this.models });
      }
      this.setState({ mounted: true });
    }

    componentWillUnmount() {
      const { store } = this.context;
      if (store && this.models) {
        store.unmodel(Object.keys(this.models).map(key => this.models[key]));
      }
    }

    render() {
      const { mounted } = this.state;
      if (!mounted) {
        return null;
      }
      return <ConnectedPage {...this.props} models={this.models} />;
    }
  }
  return WrappedPage;
};
