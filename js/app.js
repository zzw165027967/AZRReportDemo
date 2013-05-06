function sizeToolbar() {
    var iw = $('body').innerWidth();
    var margin = (iw - 1024) / 2;

    $('.footer_loggedin').css('margin-left', margin);
}

function displayToolbar() {
    BuildToolbar();
    $('.footer_loggedin').css('display', 'block');
}

function bindButtonUrls() {
    $('#btnPortaal').click(function () {
        document.location.href = baseUrl;
    });

    $('#btnDash').click(function () {
        document.location.href = basePortal;
    });

    $('#btnBackDashBoard').click(function () {
        document.location.href = basePortal;
    });
}

function AddToolbarItem(item_name) {
    if (item_name.Setting.DisplayInToolbar) {
        $('.ul_floggedin').append($("<li class='liFLoggedin'></li>").append($('<a>' + item_name.Setting.DisplayName + '</a>').attr({ 'class': 'buttonFLoggedinModuleSelect', 'href': item_name.Setting.Url })));
    }
}

function BindCloseButton() {
    $('#btnClose').hover(function () {
        this.style.cursor = 'pointer';
    });

    $('#btnClose').bind('click', function () {
        document.location.href = basePortal;
    });
}


//This function is not implemented completely
function BuildToolbar() {
//    $.ajax({
//        url: "/WCFModuleService/WCFModuleService.svc/GetModulesForCurrentUser",
//        type: "GET",
//        cache: false,
//        data: "{}",
//        dataType: "json",
//        contentType: "application/json",
//        error: function (error) {
//            Tba.TbaDialog.alert('webservice error:' + error.responseText);
//        },
//        success: function (data) {
//            $.each(data.GetModulesForCurrentUserResult, function (index, elem) {
//                AddToolbarItem(elem);
//            });
//        }
//    });
}

function buildSelectBox() {
    var options = [{ 'name': 'Home', 'url': baseUrl },
                   { 'name': 'Dashboard', 'url': basePortal },
                   { 'name': 'Uitloggen', 'url': basePortal + 'ServerStuff/Logout.ashx'}];
    $.each(options, function (index, elem) {
        $('#dropDownOptions').append($('<span></span>').attr({ 'class': 'selectOption', 'data-url': elem.url, 'value': elem.name }).text(elem.name));
    });
    if (!isHomePage) {//Only in dashboard, can switch organization
        var sugOrgs = getSugOrganizations();
        if (sugOrgs.length == 1) {
            $("#divOrgName").show();
            $("#selectSubOrganizations").hide();
        } else {
            $.each(sugOrgs, function (index, elem) {
                $('#subOrganizations').append($('<span></span>').attr({ 'class': 'selectOption', 'data-url': basePortal, 'value': elem.key }).text(elem.value));
            });
        }
    }
}

function checkTransition() {
    var cookie = readCookie("loginTransition");

    if (cookie == null || cookie.length == 0) {
        animateTransition();
        setTransitionCookie(false);
    }
}
/*Enables the login select box*/

function enableSelectBox() {
    $('#selectPortalFunctions').each(function(e) {
        $(this).children('#itemUserName,#arrowUserName').click(toggleOptions);

        $(this).find('span.selectOption').click(function() {
            $(this).parent().hide();
            var url = ($(this).data('url'));
            document.location.href = url;
        });
    });

    $("#selectSubOrganizations").each(function (e) {
        //enable sub organizations
        $("#itemCurrentOrg, #arrowCurrentOrg").click(toggleOptions);
        $(this).find('span.selectOption').click(function () {
            var item = this;
            $(this).parent().hide();

            if (isModuleOpenedForUser()) {
//                Tba.TbaDialog.alert({ message: "U heeft nog modules open staan. U moet deze sluiten en eventuele wijzigingen opslaan, voordat u de Dashboard van een andere organisatie kunt openen." });
//                return;
                Tba.TbaDialog.confirm({
                    message: "U heeft nog modules open staan. U moet deze afsluiten en eventuele wijzigingen opslaan, voordat het Dashboard van een andere organisatie opent. Toch doorgaan?",
                    ok: function () {
                        switchOrganiztion(item);

                        var url = ($(item).data('url'));
                        window.location.href = url;
                    }
                });
            } else {
                switchOrganiztion(item);

                var url = ($(item).data('url'));
                window.location.href = url;
            }
        });
    });

    $(document).bind('click', closeDocument);
}

function closeDocument(event) {
    var currentSelect = $(event.target).closest('.selectBox');
    if (!currentSelect.length) {
        $("div .selectOptions").each(function (index, elem) {
            $(elem).hide();
        });
    }
}

function toggleOptions(event) {
    var selectPanel = $(event.target).parent().find(".selectOptions");

    if (selectPanel.css('display') == 'none') {
        selectPanel.show();

    }
    else {
        selectPanel.hide();
    }
}

function attachPlaceHolders() {
    $(function () {
        var input = document.createElement("input");
        if (('placeholder' in input) == false) {
            $('[placeholder]').focus(function () {
                var i = $(this);
                if (i.val() == i.attr('placeholder')) {
                    i.val('').removeClass('placeholder');
                    if (i.hasClass('password')) {
                        i.removeClass('password');
                        this.type = 'password';
                    }
                }
            }).blur(function () {
                var i = $(this);
                if (i.val() == '' || i.val() == i.attr('placeholder')) {
                    if (this.type == 'password') {
                        i.addClass('password');
                        this.type = 'text';
                    }
                    i.addClass('placeholder').val(i.attr('placeholder'));
                }
            }).blur().parents('form').submit(function () {
                $(this).find('[placeholder]').each(function () {
                    var i = $(this);
                    if (i.val() == i.attr('placeholder'))
                        i.val('');
                });
            });
        }
    });
}

function animateTransition() {
    //    var myWidth = $("html").width();
    var myWidth = '100%';
    $(".widget-container").fadeOut(500, function () {
        $(".animate").animate({
            width: myWidth
        }, 2000
        ,
            function () {
                document.location.href = basePortalUrl;
            }
        );
    });
}

function setTransitionCookie(clear) {
    if (clear)
        eraseCookie("loginTransition");
    else
        createCookie("loginTransition", "done", 2);
}


//Options is an object with 3 properties.
//1, name of the report
//2, charts: is an array of chartId's 'string'
//3, filters: is an array of Filterid's
function createNavigatorTemplate(options) {
    var snippet = "<div id='dashboard' style='width: 100%; height: 100%; overflow: auto;'>" +
        " <table> <tr> <td> <br/> <table> <tr id='charts'> </tr> </table> " +
        " </td> </tr> " +
        " <tr> <td> <div id='title' class='TextTitle' style='display: inline-block; vertical-align: bottom; margin-bottom: 0px;'> </div> " +
        "<div id='filters' style='display: inline-block; float: none;'> " +
        "</div> </td> </tr> <tr> <td> <div id='tblData'> </div> </td> </tr> </table></div>";
    $('#grid').append(snippet);
    var charts = options.charts;
    var filters = options.filters;
    var title = options.title;

    $.each(charts, function (index, chart) {
        $('#charts').append(function () {
            return "<td><div style='width: 450;' id='" + chart + "'></td>";
        });
    });

    $.each(filters, function (index, filter) {
        $('#filters').append(function () {
            return "<div style='display: inline-block;' id='" + filter + "'></div>";
        });
    });

    //$('#ReportTitle').text(title);
}

function addDefaultTable(table) {
    var tableDefault = {
        'chartType': 'Table',
        'options': {
            'width': '100%'
        }
    };

    var result = $.extend(true, table, tableDefault);
    return result;
}

function addDefaultPieChart(chart) {
    var pieDefault = {
        'chartType': 'PieChart',
        'options': {
            'width': 350,
            'height': 200,
            'fontSize': 12,
            'fontName': 'inherit',
            'chartArea': { 'left': 80, 'top': 25, 'right': 150, 'bottom': 0, width: "65%" },
            'pieSliceText': 'label',
            'titleTextStyle': { 'color': '#455259' },
            'backgroundColor': 'none',
            'legend': { 'position': 'right' },
            'slices': { 0: { color: '#A9C39F' }, 1: { color: '#455259' }, 2: { color: '#9e2e1a' }, 3: { color: '#D37693'} }
        }
    };

    var result = $.extend(true, pieDefault, chart);
    return result;
}

function addDefaultLineChart(chart) {
    var lineDefault = {
        'chartType': 'LineChart',
        'options': {
            'curveType': "function",
            'width': 600,
            'height': 200,
            'fontSize': 12,
            'fontName': 'inherit',
            'chartArea': { 'left': 80, 'top': 25, 'right': 150, 'bottom': 0, width: "60%" },
            'pieSliceText': 'label',
            'titleTextStyle': { 'color': '#455259', 'fontName': 'inherit' },
            'backgroundColor': 'none',
            'legend': { 'position': 'right' },
            'series': { 0: { color: '#A9C39F' }, 1: { color: '#455259' }, 2: { color: '#9e2e1a' }, 3: { color: '#D37693'} }
        }
    };

    var result = $.extend(true, lineDefault, chart);
    return result;
}

function addDefaultAreaChart(chart){
	var areaDefault = {
        'chartType': 'AreaChart',
        'options': {
            'curveType': "function",
            'width': 600,
            'height': 300,
            'fontSize': 12,
            'fontName': 'inherit',
            'chartArea': { 'left': 80, 'top': 25, 'right': 150, 'bottom': 0, width: "60%" },
            'pieSliceText': 'label',
            'titleTextStyle': { 'color': '#455259', 'fontName': 'inherit' },
            'backgroundColor': 'none',
            'legend': { 'position': 'right' },
            'series': { 0: { color: '#A9C39F' }, 1: { color: '#455259' }, 2: { color: '#9e2e1a' }, 3: { color: '#D37693'} }
        }
    };

    var result = $.extend(true, areaDefault, chart);
    return result;
}


function addDefaultRangeSelector(range) {
    var rangeDefault = {
        'controlType': 'NumberRangeFilter',
        'options': {
            'ui': {
                'labelStacking': 'vertical'
            }
        }
    };
    var result = $.extend(true, range, rangeDefault);
    return result;
}

function addDefaultDropdownSelector(dropdown) {
    var dropdownDefault = {
        'controlType': 'CategoryFilter',
        'options': {
            'ui': {
                'labelStacking': 'vertical',
                'allowTyping': false,
                'allowMultiple': false,
                'caption': 'Kies een waarde...'
            }
        }
    };
    var result = $.extend(true, dropdown, dropdownDefault);
    return result;
}

function addWithAbs(numrows, colindex, datatable) {
    var acc = 0;
    for (var i = 0; i < numrows; i++) {
        acc = acc + Math.abs(datatable.getValue(i, colindex));
    }

    return acc;
}

//Util function to extract unique elements from object array
function UniqueObjFromArray(objarr, key) {
    var dupes = {};
    var singles = [];

    $.each(objarr, function (i, el) {
        if (!dupes[el[key]]) {
            dupes[el[key]] = true;
            singles.push(el[key]);
        }
    });
    return singles;
}

function getSugOrganizations() {
    var subOrgsJson;
    $.ajax({
        url: "/WCFModuleService/WCFModuleService.svc/GetSubOrgsJson",
        type: "GET",
        async: false,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        error: function (error) {
            Tba.TbaDialog.alert('webservice error:' + error.responseText);
        },
        success: function (data) {
            subOrgsJson = data.GetSubOrgsJsonResult;
        }
    });

    return subOrgsJson;
}

function switchOrganiztion(option) {
    var currentOrgId = $(option).attr("value");

    $.ajax({
        url: "/WCFModuleService/WCFModuleService.svc/SwitchOrganization?currentOrganizationId=" + currentOrgId,
        type: "GET",
        cache: false,
        async: false,
        data: "{}",
        dataType: "json",
        contentType: "application/json",
        error: function (error) {
            Tba.TbaDialog.alert("Fout opgetreden bij het laden. Probeer het opnieuw.");
        },
        success: function (data) {
        }
    });
}

function isModuleOpenedForUser() {
    var hasModuleOpened;
    $.ajax({
        url: "/WCFModuleService/WCFModuleService.svc/IsModuleOpenedForUser",
        type: "GET",
        cache: false,
        async: false,
        data: "{}",
        dataType: "json",
        contentType: "application/json",
        error: function (error) {
            Tba.TbaDialog.alert('webservice error:' + error.responseText);
        },
        success: function (data) {
            hasModuleOpened = data.IsModuleOpenedForUserResult;
        }
    });

    return hasModuleOpened;
}