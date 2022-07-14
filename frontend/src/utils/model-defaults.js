const getUserDef = () => {
    return {
        name: '',
        lname: '',
        role: '',
        email: ''
    };
};

const getProjectDef = () => {
    return {
        name: '',
        desc: '',
        membersId: []
    };
};

const getTicketDef = () => {
    return {
        name: '',
        desc: '',
        projectId: '',
        type: 'Bug',
        priority: 'Haute',
        status: 'Nouveau',
        membersId: []
    };
};

module.exports = { getUserDef, getProjectDef, getTicketDef };