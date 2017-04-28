import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Card, Grid } from 'semantic-ui-react';
import ProjectCard from '../components/projectCard';
import { fetchProject, contribute, fetchProjectBalance } from '../actions/projectActions';
import { fetchAccountsAndBalances } from '../actions/userActions';
import ContributionList from '../components/contributionList';
import ProjectDetails from '../components/projectDetails';
import ContributeModal from '../components/contributeModal';

var _this;

class ProjectContainer extends Component {

    constructor(props) {
        super(props);
        _this = this;

        this.state = {
            showContributeModal: false
        }

    }

    componentDidMount() {
        const { dispatch, params } = _this.props;
        console.log("ProjectContainer firing???");
        dispatch(fetchProject(params.address));
        dispatch(fetchProjectBalance(params.address));
    }


    toggleModalDisplayed() {
        _this.setState({
            showContributeModal: !_this.state.showContributeModal
        });
    }

    handleContributeClicked() {
        _this.toggleModalDisplayed();
    }

    handleContribute(amount) {
        const {dispatch, user, project} = _this.props;

        console.log("project: ", project);

        _this.toggleModalDisplayed();

        let selectedUserAddress = user.accounts[user.selectedAccount].address;

        if (!!selectedUserAddress) {
            dispatch(contribute(project.project.address, amount, selectedUserAddress))
            .then(() => {
                dispatch(fetchProject(project.project.address));
                dispatch(fetchAccountsAndBalances());
            });
        }
    }

    render() {
        const { 
            project, 
            network: {
                network,
                currentBlock
            }
        } = this.props;
        let projectDetails = project.project;

        let contributions = [
            {
                contributor: "0xAb1234advgtny...",
                amount: 20
            }
        ];

        return (
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <ProjectCard
                                project={projectDetails}
                                isLoading={project.isFetching}
                                onContributeClicked={_this.handleContributeClicked}/>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ProjectDetails 
                                project={projectDetails}
                                currentBlock={currentBlock}/>
                        </Grid.Column>
                        <ContributeModal 
                            isDisplayed={_this.state.showContributeModal}
                            gasCost={3000000}
                            onCloseModal={_this.toggleModalDisplayed}
                            onHandleContribute={_this.handleContribute}/>
                    </Grid.Row>
                    <Grid.Row>
                        <ContributionList contributions={contributions}/>
                    </Grid.Row>
                    </Grid>   
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        project: state.project,
        network: state.network,
    }
}

export default connect(mapStateToProps)(ProjectContainer);