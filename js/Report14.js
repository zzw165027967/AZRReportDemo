/**
 * @author Jackey.Zhuang
 */
function drawReport14Visualization()
{
	// Create and populate the data table.
	var data = new google.visualization.DataTable({
		cols : [{ id : '', label : 'Verzender', type : 'string'
			}, { id : '', label : 'Ontvanger', type : 'string'
			}, { id : '', label : 'Datum', type : 'string'
			}, { id : '', label : 'Berichtnaam', type : 'string'
			}, { id : '', label : 'Dagen te laat', type : 'number'
			}],
		rows : [{c:[{v: '5517'}, {v: '123'}, {v: '31-05-2013'}, {v: 'name'},{v: 56}]},
              {c:[{v: '5514'}, {v: '123'}, {v: '31-05-2013'}, {v: 'name'}, {v: 78}]},
              {c:[{v: '5517'}, {v: '123'}, {v: '31-03-2013'}, {v: 'name'}, {v: 55}]},
              {c:[{v: '5514'}, {v: '123'}, {v: '21-05-2013'}, {v: 'name'}, {v: 12}]},
              {c:[{v: '5517'}, {v: '123'}, {v: '31-06-2013'}, {v: 'name'}, {v: 15}]},
              {c:[{v: '5514'}, {v: '123'}, {v: '31-02-2013'}, {v: 'name'}, {v: 54}]},
              {c:[{v: '5517'}, {v: '456'}, {v: '31-03-2013'}, {v: 'name'}, {v: 53}]},
              {c:[{v: '5514'}, {v: '456'}, {v: '31-11-2013'}, {v: 'name'}, {v: 36}]},
              {c:[{v: '5517'}, {v: '456'}, {v: '31-10-2013'}, {v: 'name'}, {v: 35}]},
              {c:[{v: '5514'}, {v: '456'}, {v: '31-08-2013'}, {v: 'name'}, {v: 88}]},
              {c:[{v: '5517'}, {v: '456'}, {v: '31-09-2013'}, {v: 'name'}, {v: 92}]},
              {c:[{v: '5514'}, {v: '456'}, {v: '31-03-2013'}, {v: 'name'}, {v: 24}]}
              ]
		});
		
	// Maak filters
    // Maak een filter aan voor 'Ontvanger'
    var filter1 = new google.visualization.ControlWrapper(addDefaultDropdownSelector({ 'containerId': 'divfilter1', 'options': { 'filterColumnLabel': 'Verzender'} }));
    // Maak een filter aan voor 'Type'
    var filter2 = new google.visualization.ControlWrapper(addDefaultDropdownSelector({ 'containerId': 'divfilter2', 'options': { 'filterColumnLabel': 'Ontvanger'} }));
    // Maak een filter aan voor 'Ontvanger'
    var filter3 = new google.visualization.ControlWrapper(addDefaultRangeSelector({ 'containerId': 'divfilter3', 'options': { 'filterColumnLabel': 'Dagen te laat'} }));
    
    // Maak een grafiek aan voor suppliers
    var graph1 = new google.visualization.ChartWrapper(addDefaultLineChart({ 'chartType': 'ColumnChart', 'containerId': 'div1', 'options': { 'title': 'Ontvangen berichten'} }));
    
    
    //Declareer table
    // Vul de tabel
    var table = new google.visualization.ChartWrapper(addDefaultTable({ 'containerId': 'tblData' }));
    
    var reportDash = new google.visualization.Dashboard(document.getElementById('dashboard')).
                bind([filter1,filter2,filter3], [table]);
    
    
    //Register callbacks
    google.visualization.events.addListener(table, 'ready', redraw);
    
    
    // Maak het dashboard aan
    reportDash.draw(data);
    
    function redraw(event) {

     	graph1.setDataTable(google.visualization.data.group(table.getDataTable(), [1],
		[{ 'column': 4, 'aggregation': google.visualization.data.sum, 'type': 'number'}]));

        graph1.draw();
    }
    
}
