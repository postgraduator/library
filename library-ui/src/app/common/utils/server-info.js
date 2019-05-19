export const getServerInfoContext = (applicationId) => {
    const appEntryPointDataSet = document.getElementById(applicationId).dataset;
    const csrf = {
        header: appEntryPointDataSet.csrfHeader,
        parameterName: appEntryPointDataSet.csrfParameterName,
        token: appEntryPointDataSet.csrfToken
    };
    return {
        csrf: csrf,
        actionUrl: appEntryPointDataSet.actionUrl || '',
        error: appEntryPointDataSet.error || '',
        apiPath: appEntryPointDataSet.apiPath
    };
};