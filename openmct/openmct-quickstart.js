import installYamcsPlugin from 'openmct-yamcs';

(async function () {
    const ONE_SECOND = 1000;
    const FIFTEEN_SECONDS = ONE_SECOND * 15;
    const ONE_MINUTE = FIFTEEN_SECONDS * 4;
    const FIFTEEN_MINUTES = ONE_MINUTE * 15;

    openmct.setAssetPath('node_modules/openmct/dist');

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

    openmct.install(installYamcsPlugin({
        "yamcsDictionaryEndpoint": "http://localhost:9000/yamcs-proxy/",
        "yamcsHistoricalEndpoint": "http://localhost:9000/yamcs-proxy/",
        "yamcsWebsocketEndpoint": "ws://localhost:9000/yamcs-proxy-ws/",
        "yamcsUserEndpoint": "http://localhost:9000/yamcs-proxy/api/user/",
        "yamcsInstance": "myproject",
        "yamcsFolder": "myproject"
    }));

    openmct.install(openmct.plugins.OperatorStatus({ statusStyles: STATUS_STYLES }));

    installDefaultPlugins();

    openmct.install(openmct.plugins.CouchDB("http://localhost:5984/openmct"));

    openmct.start();

    function installDefaultPlugins() {
        openmct.install(openmct.plugins.Espresso());
        openmct.install(openmct.plugins.MyItems('Shared Items'));
        openmct.install(openmct.plugins.example.Generator());
        openmct.install(openmct.plugins.example.ExampleImagery());
        openmct.install(openmct.plugins.UTCTimeSystem());
        openmct.install(openmct.plugins.TelemetryMean());
        openmct.install(openmct.plugins.Timeline());
        openmct.install(openmct.plugins.Timelist());

        openmct.install(openmct.plugins.Hyperlink());

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
                        start: - FIFTEEN_MINUTES,
                        end: FIFTEEN_SECONDS
                    }
                },
                {
                    name: "Fixed",
                    timeSystem: 'utc',
                    bounds: {
                        start: Date.now() - FIFTEEN_MINUTES,
                        end: Date.now() + FIFTEEN_SECONDS
                    }
                }
            ]
        }));
        openmct.install(openmct.plugins.SummaryWidget());
        openmct.install(openmct.plugins.Notebook('Notebook'));
        openmct.install(openmct.plugins.LADTable());
        openmct.install(openmct.plugins.ClearData(['table', 'telemetry.plot.overlay', 'telemetry.plot.stacked']));
        openmct.install(openmct.plugins.Clock({ enableClockIndicator: true }));
        openmct.install(openmct.plugins.Timer());
        openmct.install(openmct.plugins.BarChart());
        openmct.install(openmct.plugins.ScatterPlot());
        openmct.install(openmct.plugins.example.ExampleImagery());
        openmct.install(openmct.plugins.example.ExampleTags());
        openmct.install(openmct.plugins.FaultManagement());
    }
})();