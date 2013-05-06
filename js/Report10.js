/**
 * @author Jackey.Zhuang
 */
function drawReport10Visualization()
{
	// Create and populate the data table.
	var data = new google.visualization.DataTable({
		cols : [{ id : '', label : 'Ontvanger', type : 'string'
			}, { id : '', label : 'Verzender', type : 'number'
			}, { id : '', label : 'Periode', type : 'string'
			}, { id : '', label : 'Year', type : 'string'
			}, { id : '', label : 'Type', type : 'string'
			}, { id : '', label : 'Versie', type : 'string'
			}, { id : '', label : 'Berichten', type : 'number'
			}],
		rows : [{c:[{v: '5517'}, {v: '123'}, {v: '1'}, {v: '2013'}, {v: 'AW33'}, {v: '1.1'}, {v: 15}]},
              {c:[{v: '5514'}, {v: '123'}, {v: '2'}, {v: '2013'}, {v: 'AW33'}, {v: '1.2'}, {v: 25}]},
              {c:[{v: '5517'}, {v: '123'}, {v: '3'}, {v: '2013'}, {v: 'AW33'}, {v: '1.3'}, {v: 1}]},
              {c:[{v: '5514'}, {v: '123'}, {v: '4'}, {v: '2013'}, {v: 'AW33'}, {v: '1.1'}, {v: 5}]},
              {c:[{v: '5517'}, {v: '123'}, {v: '5'}, {v: '2013'}, {v: 'AW33'}, {v: '1.2'}, {v: 7}]},
              {c:[{v: '5514'}, {v: '123'}, {v: '6'}, {v: '2013'}, {v: 'AW33'}, {v: '1.3'}, {v: 6}]},
              {c:[{v: '5517'}, {v: '456'}, {v: '7'}, {v: '2013'}, {v: 'AW33'}, {v: '1.1'}, {v: 12}]},
              {c:[{v: '5514'}, {v: '456'}, {v: '8'}, {v: '2013'}, {v: 'AW33'}, {v: '1.2'}, {v: 10}]},
              {c:[{v: '5517'}, {v: '456'}, {v: '9'}, {v: '2013'}, {v: 'AW33'}, {v: '1.3'}, {v: 9}]},
              {c:[{v: '5514'}, {v: '456'}, {v: '10'}, {v: '2013'}, {v: 'AW33'}, {v: '1.1'}, {v: 2}]},
              {c:[{v: '5517'}, {v: '456'}, {v: '11'}, {v: '2013'}, {v: 'AW33'}, {v: '1.2'}, {v: 2}]},
              {c:[{v: '5514'}, {v: '456'}, {v: '12'}, {v: '2013'}, {v: 'AW33'}, {v: '1.3'}, {v: 8}]},
              ]
		});
		
	// Maak filters
    // Maak een filter aan voor 'Ontvanger'
    var filter1 = new google.visualization.ControlWrapper(addDefaultDropdownSelector({ 'containerId': 'divfilter1', 'options': { 'filterColumnLabel': 'Ontvanger'} }));
    // Maak een filter aan voor 'Type'
    var filter2 = new google.visualization.ControlWrapper(addDefaultDropdownSelector({ 'containerId': 'divfilter2', 'options': { 'filterColumnLabel': 'Verzender'} }));
    // Maak een filter aan voor 'Ontvanger'
    var filter3 = new google.visualization.ControlWrapper(addDefaultDropdownSelector({ 'containerId': 'divfilter3', 'options': { 'filterColumnLabel': 'Periode'} }));
    // Maak een filter aan voor 'Type'
    var filter4 = new google.visualization.ControlWrapper(addDefaultDropdownSelector({ 'containerId': 'divfilter4', 'options': { 'filterColumnLabel': 'Year'} }));
    // Maak een filter aan voor 'Ontvanger'
    var filter5 = new google.visualization.ControlWrapper(addDefaultDropdownSelector({ 'containerId': 'divfilter5', 'options': { 'filterColumnLabel': 'Type'} }));
    // Maak een filter aan voor 'Type'
    var filter6 = new google.visualization.ControlWrapper(addDefaultDropdownSelector({ 'containerId': 'divfilter6', 'options': { 'filterColumnLabel': 'Versie'} }));
    
    // Maak een grafiek aan voor suppliers
    var graph1 = new google.visualization.ChartWrapper(addDefaultLineChart({ 'containerId': 'div1', 'options': { 'title': 'Aantal berichten per periode'} }));
    // Maak een grafiek aan voor suppliers
    var graph2 = new google.visualization.ChartWrapper(addDefaultPieChart({ 'containerId': 'div2', 'options': { 'title': 'Aandeel per periode'} }));
    
    
    //Declareer table
    // Vul de tabel
    var table = new google.visualization.ChartWrapper(addDefaultTable({ 'containerId': 'tblData' }));
    
    var reportDash = new google.visualization.Dashboard(document.getElementById('dashboard')).
                bind([filter1,filter2,filter3,filter4,filter5,filter6], [table]);
    
    
    //Register callbacks
    google.visualization.events.addListener(table, 'ready', redraw);
    
    
    // Maak het dashboard aan
    reportDash.draw(data);
    
    function redraw(event) {

     	graph1.setDataTable(google.visualization.data.group(table.getDataTable(), [2],
		[{ 'column': 6, 'aggregation': google.visualization.data.sum, 'type': 'number'}]));

        graph2.setDataTable(google.visualization.data.group(table.getDataTable(), [2],
		[{ 'column': 6, 'aggregation': google.visualization.data.sum, 'type': 'number'}]));

        graph1.draw();
        graph2.draw();
    }
    
}
