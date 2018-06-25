import PropTypes from 'prop-types';
import React from 'react';
import { matchPath, withRouter, Prompt } from 'react-router';

class Beforeleave extends React.Component {
    static propTypes = {
        message: PropTypes.string.isRequired,
        exact: PropTypes.bool,
        enableUnload: PropTypes.bool,
        enableRouter: PropTypes.bool
    }

    static defaultProps = {
        exact: true,
        enableUnload: true,
        enableRouter: true
    }

    constructor(props) {
        super(props);
        this.handleBeforeunload = this.handleBeforeunload.bind(this);
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.handleBeforeunload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleBeforeunload);
    }

    handleBeforeunload(event) {
        const { message, enableUnload } = this.props;

        if(enableUnload) {
            // keep in mind this is browser handled behavior
            // in some browsers the custom message is shown
            // in others it is not
            event.returnValue = message;
            return message;
        }
    }

    render() {
        // this is for react router behavior
        const { exact, location, message, enableRouter } = this.props;

        if(enableRouter) {
            return (
                <Prompt
                    message={nextLocation => (
                        matchPath(location.pathname, {
                            exact,
                            path: nextLocation.pathname
                        }) ? true : message
                    )}
                />
            )
        }

        return null;
    }
}

export default withRouter(Beforeleave);