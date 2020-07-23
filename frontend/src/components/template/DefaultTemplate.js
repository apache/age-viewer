import {connect} from 'react-redux'
import DefaultTemplate from './presentations/DefaultTemplate'

const mapStateToProps = (state)  => {
    return {
        theme: state.setting.theme
    }
}

export default connect(mapStateToProps)(DefaultTemplate);


/*
class DefaultTemplate extends Component {
    constructor(props) {
        super(props);
        
        this.state = {setting : store.getState().setting}
    }

    componentDidMount() {
        store.subscribe(function() {
            this.setState({setting : store.getState().setting});
        }.bind(this));
    }

    render() {
        return (
            <div>
                <input type="radio" className="theme-switch" name="theme-switch" id="default-theme" checked={this.state.setting.theme === 'default' ? true : false}/>
                <input type="radio" className="theme-switch" name="theme-switch" id="dark-theme" checked={this.state.setting.theme === 'dark' ? true : false}/>
                <div className="wrapper">
                    <Navigator />
                    <Sidebar />
                    <Contents />
                </div>

            </div>
        );
    }
}

export default DefaultTemplate
*/