/**
 * @author Jackey.Zhuang
 */
function drawReport01Visualization()
{
	// Create and populate the data table.
	var data = new google.visualization.DataTable({
		cols : [{ id : '', label : 'Ontvanger', type : 'string'
			}, { id : '', label : 'Type', type : 'string'
			}, { id : '', label : 'Dag van de week', type : 'string'
			}, { id : '', label : 'Aantal', type : 'number'
			}],
		rows : [{c:[{v: '5517'}, {v: 'AW33'}, {v: 'Monday'}, {v: 10}]},
              {c:[{v: '5518'}, {v: 'AW35'}, {v: 'Tuesday'}, {v: 7}]},
              {c:[{v: '5519'}, {v: 'AW39'}, {v: 'Wednesday'}, {v: 2}]},
              {c:[{v: '5520'}, {v: 'AW33'}, {v: 'Thursday'}, {v: 5}]},
              {c:[{v: '5521'}, {v: 'AW35'}, {v: 'Friday'}, {v: 6}]}
              ]
		});
		
	// Maak filters
    // Maak een filter aan voor 'Ontvanger'
    var categoryPickerOntvanger = new google.visualization.ControlWrapper(addDefaultDropdownSelector({ 'containerId': 'ctrlOntvanger', 'options': { 'filterColumnLabel': 'Ontvanger'} }));

    // Maak een filter aan voor 'Type'
    var categoryPickerType = new google.visualization.ControlWrapper(addDefaultDropdownSelector({ 'containerId': 'ctrlType', 'options': { 'filterColumnLabel': 'Type'} }));
    
    // Maak een grafiek aan voor suppliers
    var aw33chartSupplier = new google.visualization.ChartWrapper(addDefaultLineChart({ 'chartType': 'ColumnChart', 'containerId': 'AW33berichten', 'options': { 'title': 'AW33 berichten'} }));
    // Maak een grafiek aan voor suppliers
    var aw35chartSupplier = new google.visualization.ChartWrapper(addDefaultLineChart({ 'chartType': 'ColumnChart', 'containerId': 'AW35berichten', 'options': { 'title': 'AW35 berichten'} }));
    // Maak een grafiek aan voor suppliers
    var aw39chartSupplier = new google.visualization.ChartWrapper(addDefaultLineChart({ 'chartType': 'ColumnChart', 'containerId': 'AW39berichten', 'options': { 'title': 'AW39 berichten'} }));
    
    //Declareer table
    // Vul de tabel
    var table = new google.visualization.ChartWrapper(addDefaultTable({ 'containerId': 'tblData' }));
    
    var reportDash = new google.visualization.Dashboard(document.getElementById('dashboard')).
                bind([categoryPickerOntvanger, categoryPickerType], [table]);
    
    
    //Register callbacks
    google.visualization.events.addListener(table, 'ready', redraw);
    
    
    // Maak het dashboard aan
    reportDash.draw(data);
    
    function redraw(event) {

     	aw33chartSupplier.setDataTable(google.visualization.data.group(table.getDataTable(), [2],
		[{ 'column': 3, 'aggregation': google.visualization.data.sum, 'type': 'number'}]));

        aw35chartSupplier.setDataTable(google.visualization.data.group(table.getDataTable(), [2],
		[{ 'column': 3, 'aggregation': google.visualization.data.sum, 'type': 'number'}]));

		aw39chartSupplier.setDataTable(google.visualization.data.group(table.getDataTable(), [2],
		[{ 'column': 3, 'aggregation': google.visualization.data.sum, 'type': 'number'}]));
		
        aw33chartSupplier.draw();
        aw35chartSupplier.draw();
        aw39chartSupplier.draw();
    }
    
}
