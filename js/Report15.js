/**
 * @author Jackey.Zhuang
 */
function drawReport15Visualization()
{
	// Create and populate the data table.
	var data = new google.visualization.DataTable({
		cols : [{ id : '', label : 'Periode', type : 'string'
			}, { id : '', label : 'Year', type : 'string'
			}, { id : '', label : 'Verzender (AW36/310)', type : 'string'
			}, { id : '', label : 'Ontvanger (AW36/310)', type : 'string'
			}, { id : '', label : 'Duur', type : 'number'
			}],
		rows : [{c:[{v: '1'}, {v: '2013'}, {v: '5517'}, {v: '123'},{v: 56}]},
              {c:[{v: '2'}, {v: '2013'}, {v: '5514'}, {v: '456'}, {v: 78}]},
              {c:[{v: '3'}, {v: '2013'}, {v: '5517'}, {v: '123'}, {v: 55}]},
              {c:[{v: '4'}, {v: '2013'}, {v: '5514'}, {v: '456'}, {v: 12}]},
              {c:[{v: '5'}, {v: '2013'}, {v: '5517'}, {v: '456'}, {v: 15}]},
              {c:[{v: '6'}, {v: '2013'}, {v: '5514'}, {v: '123'}, {v: 54}]},
              {c:[{v: '7'}, {v: '2013'}, {v: '5517'}, {v: '456'}, {v: 53}]},
              {c:[{v: '8'}, {v: '2013'}, {v: '5514'}, {v: '456'}, {v: 36}]},
              {c:[{v: '9'}, {v: '2013'}, {v: '5517'}, {v: '321'}, {v: 35}]},
              {c:[{v: '10'}, {v: '2013'}, {v: '5514'}, {v: '123'}, {v: 88}]},
              {c:[{v: '11'}, {v: '2013'}, {v: '5517'}, {v: '456'}, {v: 92}]},
              {c:[{v: '12'}, {v: '2013'}, {v: '5514'}, {v: '456'}, {v: 24}]}
              ]
		});
		
	// Maak filters
    // Maak een filter aan voor 'Ontvanger'
    var filter1 = new google.visualization.ControlWrapper(addDefaultDropdownSelector({ 'containerId': 'divfilter1', 'options': { 'filterColumnLabel': 'Periode'} }));
    // Maak een filter aan voor 'Type'
    var filter2 = new google.visualization.ControlWrapper(addDefaultDropdownSelector({ 'containerId': 'divfilter2', 'options': { 'filterColumnLabel': 'Year'} }));
    // Maak een filter aan voor 'Ontvanger'
    var filter3 = new google.visualization.ControlWrapper(addDefaultDropdownSelector({ 'containerId': 'divfilter3', 'options': { 'filterColumnLabel': 'Verzender (AW36/310)'} }));
    // Maak een filter aan voor 'Ontvanger'
    var filter4 = new google.visualization.ControlWrapper(addDefaultDropdownSelector({ 'containerId': 'divfilter4', 'options': { 'filterColumnLabel': 'Ontvanger (AW36/310)'} }));
    // Maak een filter aan voor 'Type'
    var filter5 = new google.visualization.ControlWrapper(addDefaultRangeSelector({ 'containerId': 'divfilter5', 'options': { 'filterColumnLabel': 'Duur'} }));
    
    
    //Declareer table
    // Vul de tabel
    var table = new google.visualization.ChartWrapper(addDefaultTable({ 'containerId': 'tblData' }));
    
    var reportDash = new google.visualization.Dashboard(document.getElementById('dashboard')).
                bind([filter1,filter2,filter3,filter4,filter5], [table]);
  
    
    // Maak het dashboard aan
    reportDash.draw(data);
    
}
