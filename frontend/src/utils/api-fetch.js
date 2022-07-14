const fetchApi = (path, method, sentData, dataAction) => {
    const fullPath = process.env.REACT_APP_API_PATH + path;
    const header = new Headers({ 
        'Content-Type': 'application/json'
    });
    const infos = {
        method: method,
        credentials: 'include',
        headers: header
    };

    if (sentData !== null)
        infos['body'] = JSON.stringify(sentData);

    fetch(fullPath, infos)
    .then((response) => {
        return response.json();
    }).then((data) => {
        if (data.success === false)
            console.log(data.message)
        dataAction(data);
    }).catch((error) => {
        console.log(error);
    });
}

module.exports = { fetchApi };