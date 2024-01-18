const installYamcsPlugin = window.openmctYamcs;

const config = {
    "yamcsDictionaryEndpoint": "http://localhost:8040/yamcs/",
    "yamcsHistoricalEndpoint": "http://localhost:8040/yamcs/",
    "yamcsWebsocketEndpoint": "ws://localhost:8040/yamcs/api/websocket",
    "yamcsUserEndpoint": "http://localhost:8040/yamcs/api/user/",
    "yamcsInstance": "myproject",
    "yamcsFolder": "myproject"
};
const STATUS_STYLES = {
    "NO_STATUS": {
        iconClass: "icon-question-mark",
        iconClassPoll: "icon-status-poll-question-mark"
    },
    "GO": {
        iconClass: "icon-check",
        iconClassPoll: "icon-status-poll-question-mark",
        statusClass: "s-status-ok",
        statusBgColor: "#33cc33",
        statusFgColor: "#000"
    },
    "MAYBE": {
        iconClass: "icon-alert-triangle",
        iconClassPoll: "icon-status-poll-question-mark",
        statusClass: "s-status-warning",
        statusBgColor: "#ffb66c",
        statusFgColor: "#000"
    },
    "NO_GO": {
        iconClass: "icon-circle-slash",
        iconClassPoll: "icon-status-poll-question-mark",
        statusClass: "s-status-error",
        statusBgColor: "#9900cc",
        statusFgColor: "#fff"
    }
};
const openmct = window.openmct;

(function () {
    const THIRTY_MINUTES = 30 * 60 * 1000;

    openmct.setAssetPath('/node_modules/openmct/dist');

    installDefaultPlugins();
    openmct.install(installYamcsPlugin(config));
    openmct.install(openmct.plugins.OperatorStatus({statusStyles: STATUS_STYLES}));

    document.addEventListener('DOMContentLoaded', function () {
        openmct.start();
    });

    function installDefaultPlugins() {
        openmct.install(openmct.plugins.CouchDB("http://localhost:8040/couchdb/openmct"));
        openmct.install(openmct.plugins.Espresso());
        openmct.install(openmct.plugins.MyItems());
        openmct.install(openmct.plugins.Filters(['telemetry.plot.overlay', 'table']));
        openmct.install(openmct.plugins.example.Generator());
        openmct.install(openmct.plugins.example.ExampleImagery());
        openmct.install(openmct.plugins.example.ExampleTags());
        openmct.install(openmct.plugins.UTCTimeSystem());
        openmct.install(openmct.plugins.TelemetryMean());

        openmct.install(openmct.plugins.DisplayLayout({
            showAsView: ['summary-widget', 'example.imagery', 'yamcs.image']
        }));
        openmct.install(openmct.plugins.Conductor({
            menuOptions: [
                {
                    name: "Realtime",
                    timeSystem: 'utc',
                    clock: 'local',
                    clockOffsets: {
                        start: -THIRTY_MINUTES,
                        end: 0
                    }
                },
                {
                    name: "Fixed",
                    timeSystem: 'utc',
                    bounds: {
                        start: Date.now() - THIRTY_MINUTES,
                        end: 0
                    }
                }
            ]
        }));
        openmct.install(openmct.plugins.SummaryWidget());
        openmct.install(openmct.plugins.Notebook());
        openmct.install(openmct.plugins.LADTable());
        openmct.install(openmct.plugins.ClearData(['table', 'telemetry.plot.overlay', 'telemetry.plot.stacked']));

        openmct.install(openmct.plugins.FaultManagement());
    }
}());
