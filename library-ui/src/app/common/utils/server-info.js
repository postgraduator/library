import set from "lodash/set";

export const getServerInfoContext = (applicationId) => {
    const appEntryPointDataSet = document.getElementById(applicationId).dataset;
    const csrf = {
        header: set({}, appEntryPointDataSet.csrfHeader, appEntryPointDataSet.csrfToken),
        parameterName: appEntryPointDataSet.csrfParameterName,
        token: appEntryPointDataSet.csrfToken
    };
    return {
        csrf: csrf,
        actionUrl: appEntryPointDataSet.actionUrl || '',
        apiPath: appEntryPointDataSet.apiPath,
        uploadContext: appEntryPointDataSet.uploadContext
    };
};