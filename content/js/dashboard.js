/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [1.0, 3000, 6000, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 3000, 6000, "SignOff"], "isController": false}, {"data": [1.0, 3000, 6000, "Select_Pet_Category"], "isController": false}, {"data": [1.0, 3000, 6000, "AddTo_Cart"], "isController": false}, {"data": [1.0, 3000, 6000, "Select_ItemID"], "isController": false}, {"data": [1.0, 3000, 6000, "SignOn_Form"], "isController": false}, {"data": [1.0, 3000, 6000, "Login"], "isController": false}, {"data": [1.0, 3000, 6000, "Confirm_Order"], "isController": false}, {"data": [1.0, 3000, 6000, "BackTo_MainMenu"], "isController": false}, {"data": [1.0, 3000, 6000, "Update_Cart"], "isController": false}, {"data": [1.0, 3000, 6000, "Select_ProductID"], "isController": false}, {"data": [1.0, 3000, 6000, "Register"], "isController": false}, {"data": [1.0, 3000, 6000, "Check_Payment_Details"], "isController": false}, {"data": [1.0, 3000, 6000, "Register-0"], "isController": false}, {"data": [1.0, 3000, 6000, "Register-1"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1103, 0, 0.0, 246.69990933816837, 164, 814, 175.0, 513.0, 536.0, 683.9200000000001, 16.400999226788795, 32.87336889144561, 15.23848152285434], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["SignOff", 100, 0, 0.0, 413.7999999999999, 331, 804, 340.0, 683.8, 708.5999999999999, 803.9499999999999, 15.56420233463035, 30.814080739299612, 12.858706225680935], "isController": false}, {"data": ["Select_Pet_Category", 100, 0, 0.0, 174.82999999999998, 166, 270, 171.0, 182.0, 197.4999999999999, 269.7999999999999, 19.025875190258752, 32.62547416048326, 15.73294954575723], "isController": false}, {"data": ["AddTo_Cart", 100, 0, 0.0, 173.69000000000003, 164, 473, 170.0, 176.0, 178.95, 470.20999999999856, 17.292062943109112, 40.39959525765173, 14.522630987376793], "isController": false}, {"data": ["Select_ItemID", 100, 0, 0.0, 174.36999999999995, 168, 206, 173.0, 179.0, 180.95, 205.86999999999995, 18.804061677322302, 40.363359110567885, 16.172227576156452], "isController": false}, {"data": ["SignOn_Form", 100, 0, 0.0, 536.8099999999997, 502, 814, 523.0, 577.9, 583.9, 812.1399999999991, 19.05124785673462, 39.24501244284626, 14.41866903219661], "isController": false}, {"data": ["Login", 100, 0, 0.0, 348.7399999999999, 334, 627, 343.0, 354.8, 379.4999999999999, 625.009999999999, 18.261504747991232, 36.193089732468955, 16.799157688093498], "isController": false}, {"data": ["Confirm_Order", 100, 0, 0.0, 179.73999999999995, 168, 297, 175.0, 184.0, 200.84999999999997, 296.8599999999999, 16.5892501658925, 35.78369302629397, 13.559767957863306], "isController": false}, {"data": ["BackTo_MainMenu", 100, 0, 0.0, 185.85000000000005, 164, 516, 171.0, 192.8, 258.7499999999995, 515.98, 16.655562958027982, 30.30369076865423, 13.946431545636244], "isController": false}, {"data": ["Update_Cart", 100, 0, 0.0, 171.04000000000002, 165, 187, 170.0, 175.9, 177.0, 186.98, 17.23543605653223, 37.10735522233713, 20.21679620174078], "isController": false}, {"data": ["Select_ProductID", 100, 0, 0.0, 178.95999999999998, 167, 242, 175.5, 193.9, 201.89999999999998, 241.66999999999985, 18.779342723004696, 33.58879841549296, 16.105487089201876], "isController": false}, {"data": ["Register", 1, 0, 0.0, 384.0, 384, 384, 384.0, 384.0, 384.0, 384.0, 2.6041666666666665, 5.549112955729167, 6.856282552083333], "isController": false}, {"data": ["Check_Payment_Details", 100, 0, 0.0, 175.63000000000002, 167, 216, 174.0, 182.8, 187.95, 215.75999999999988, 16.784155756965426, 32.359819517875124, 24.848418093319903], "isController": false}, {"data": ["Register-0", 1, 0, 0.0, 203.0, 203, 203, 203.0, 203.0, 203.0, 203.0, 4.926108374384237, 1.1064501231527093, 8.41864224137931], "isController": false}, {"data": ["Register-1", 1, 0, 0.0, 177.0, 177, 177, 177.0, 177.0, 177.0, 177.0, 5.649717514124294, 10.769774011299436, 5.219367937853107], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1103, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
