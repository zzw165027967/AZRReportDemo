/**
 * @author Jackey.Zhuang
 */
function drawReport12Visualization()
{
	// Create and populate the data table.
	var data = new google.visualization.DataTable({
		cols : [{ id : '', label : 'Ontvanger', type : 'string'
			}, { id : '', label : 'Verzender', type : 'string'
			}, { id : '', label : 'Periode', type : 'string'
			}, { id : '', label : 'Year', type : 'string'
			}, { id : '', label : 'Versie', type : 'string'
			}, { id : '', label : 'Berichten', type : 'number'
			}, { id : '', label : 'Foutberichten', type : 'number'
			}, { id : '', label : '% (Berichten)', type : 'number'
			}, { id : '', label : 'Cliënten', type : 'number'
			}, { id : '', label : 'Fout clienten', type : 'number'
			}, { id : '', label : '% (Cliënten)', type : 'number'
			}],
		rows : [{c:[{v: '5517'}, {v: '123'}, {v: '1'}, {v: '2013'}, {v: '1.1'}, {v: 15}, {v: 15}, {v: 45}, {v: 15}, {v: 15}, {v: 56}]},
              {c:[{v: '5514'}, {v: '123'}, {v: '2'}, {v: '2013'}, {v: '1.2'}, {v: 25}, {v: 5}, {v: 35}, {v: 15}, {v: 54}, {v: 78}]},
              {c:[{v: '5517'}, {v: '123'}, {v: '3'}, {v: '2013'}, {v: '1.3'}, {v: 1}, {v: 15}, {v: 25}, {v: 24}, {v: 35}, {v: 55}]},
              {c:[{v: '5514'}, {v: '123'}, {v: '4'}, {v: '2013'}, {v: '1.1'}, {v: 5}, {v: 7}, {v: 25}, {v: 15}, {v: 15}, {v: 12}]},
              {c:[{v: '5517'}, {v: '123'}, {v: '5'}, {v: '2013'}, {v: '1.2'}, {v: 7}, {v: 15}, {v: 65}, {v: 35}, {v: 15}, {v: 15}]},
              {c:[{v: '5514'}, {v: '123'}, {v: '6'}, {v: '2013'}, {v: '1.3'}, {v: 6}, {v: 22}, {v: 45}, {v: 15}, {v: 77}, {v: 54}]},
              {c:[{v: '5517'}, {v: '456'}, {v: '7'}, {v: '2013'}, {v: '1.1'}, {v: 12}, {v: 20}, {v: 35}, {v: 47}, {v: 8}, {v: 53}]},
              {c:[{v: '5514'}, {v: '456'}, {v: '8'}, {v: '2013'}, {v: '1.2'}, {v: 10}, {v: 15}, {v: 35}, {v: 15}, {v: 15}, {v: 36}]},
              {c:[{v: '5517'}, {v: '456'}, {v: '9'}, {v: '2013'}, {v: '1.3'}, {v: 9}, {v: 30}, {v: 35}, {v: 23}, {v: 55}, {v: 35}]},
              {c:[{v: '5514'}, {v: '456'}, {v: '10'}, {v: '2013'}, {v: '1.1'}, {v: 2}, {v: 15}, {v: 45}, {v: 38}, {v: 15}, {v: 88}]},
              {c:[{v: '5517'}, {v: '456'}, {v: '11'}, {v: '2013'}, {v: '1.2'}, {v: 2}, {v: 16}, {v: 15}, {v: 75}, {v: 47}, {v: 92}]},
              {c:[{v: '5514'}, {v: '456'}, {v: '12'}, {v: '2013'}, {v: '1.3'}, {v: 8}, {v: 15}, {v: 35}, {v: 54}, {v: 89}, {v: 24}]}
              ]
		});
		
	// Maak filters
    // Maak een filter aan voor 'Ontvanger'
    var filter1 = new google.visualization.ControlWrapper(addDefaultDropdownSelector({ 'containerId': 'divfilter1', 'options': { 'filterColumnLabel': 'Ontvanger'} }));
    // Maak een filter aan voor 'Type'
    var filter2 = new google.visualization.ControlWrapper(addDefaultDropdownSelector({ 'containerId': 'divfilter2', 'options': { 'filterColumnLabel': 'Periode'} }));
    // Maak een filter aan voor 'Ontvanger'
    var filter3 = new google.visualization.ControlWrapper(addDefaultDropdownSelector({ 'containerId': 'divfilter3', 'options': { 'filterColumnLabel': 'Year'} }));
    // Maak een filter aan voor 'Type'
    var filter4 = new google.visualization.ControlWrapper(addDefaultRangeSelector({ 'containerId': 'divfilter4', 'options': { 'filterColumnLabel': '% (Berichten)'} }));
    // Maak een filter aan voor 'Ontvanger'
    var filter5 = new google.visualization.ControlWrapper(addDefaultRangeSelector({ 'containerId': 'divfilter5', 'options': { 'filterColumnLabel': '% (Cliënten)'} }));
    
    // Maak een grafiek aan voor suppliers
    var graph1 = new google.visualization.ChartWrapper(addDefaultAreaChart({ 'containerId': 'div1', 'options': { 'title': 'Ontvangen berichten'} }));
    // Maak een grafiek aan voor suppliers
    var graph2 = new google.visualization.ChartWrapper(addDefaultAreaChart({ 'containerId': 'div2', 'options': { 'title': 'Ontvangen cliënten'} }));
    
    
    //Declareer table
    // Vul de tabel
    var table = new google.visualization.ChartWrapper(addDefaultTable({ 'containerId': 'tblData' }));
    
    
    //Formatteer de kolommen      
    var formatter = new google.visualization.NumberFormat({ suffix: '%' });
    formatter.format(data, 7);
    formatter.format(data, 10);
    
    var reportDash = new google.visualization.Dashboard(document.getElementById('dashboard')).
                bind([filter1,filter2,filter3,filter4,filter5], [table]);
    
    
    //Register callbacks
    google.visualization.events.addListener(table, 'ready', redraw);
    
    
    // Maak het dashboard aan
    reportDash.draw(data);
    
    function redraw(event) {

     	graph1.setDataTable(google.visualization.data.group(table.getDataTable(), [2],
		[{ 'column': 5, 'aggregation': google.visualization.data.sum, 'type': 'number'},
		{ 'column': 7, 'aggregation': google.visualization.data.sum, 'type': 'number'},
		{ 'column': 6, 'aggregation': google.visualization.data.sum, 'type': 'number'}]));

        graph2.setDataTable(google.visualization.data.group(table.getDataTable(), [2],
		[{ 'column': 8, 'aggregation': google.visualization.data.sum, 'type': 'number'},
		{ 'column': 10, 'aggregation': google.visualization.data.sum, 'type': 'number'},
		{ 'column': 9, 'aggregation': google.visualization.data.sum, 'type': 'number'}]));

        graph1.draw();
        graph2.draw();
    }
    
}
