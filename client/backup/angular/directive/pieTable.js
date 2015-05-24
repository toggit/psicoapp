/**
 * Created by Tog on 6/15/2014.
 */
pieapp.directive('pieTable',function(connectionSrv){
    return{
        restrict:"A",
        link: function (scope,element,attrs) {
            var selected = []
            var opened = []
            var page = 0;

            console.log("pieTable")
            var setting = {
                "columns":[
                    {
                       "class":'details-control',
                        "orderable":false,
                        "data":null,
                        "defaultContent":''
                    },
                    {"data":"connectionId"},
                    {"data":"connectionDisplayName"},
                    {"data":"databaseVersion"},
                    {"data":"databaseStatus"},
                    {"data":"machineStatus"}
                ]
            }

            if(connectionSrv.bind()!=undefined){
                setting.data=connectionSrv.bind();
            }

            var table = element.dataTable(setting);

            scope.$on("CONNECTION_LOADED", function (temp) {
                console.log("CONNECTION_LOADED connCtrl now binding");
                setting.data = connectionSrv.bind();
                console.log("setting.data is : "+setting.data);
                element.fnClearTable();
                element.fnAddData(setting.data)
                table.api().page(page).draw(false)
                //element.fnDraw()
                //element.find("tr").each(function (i,d) {
                //    console.log($(this).text())
                //})
                //element.$('tr:odd').css('backgroundColor', 'blue');
                console.log("selected is : "+selected)
                $(table.fnSettings().aoData).each(function (){
                    var data = table.fnGetData(this.nTr);
                    for(i=0;i<selected.length;i++)
                        if(data.connectionId==selected[i])
                            $(this.nTr).addClass('selected');

                    for(i=0;i<opened.length;i++)
                        if(data.connectionId==opened[i]) {
                            $(this.nTr).addClass('shown');
                            table.api().row(this.nTr).child( format(table.api().row(this.nTr).data()) ).show();
                        }
                });

            })

            element.on( 'page.dt', function () {
                page = table.api().page();
                console.log( 'Showing page: '+page );
            } );


            element.on("click","td", function () {

                //console.log("page : "+Math.ceil(table.fnSettings()._iDisplayStart/table.fnSettings()._iDisplayLength))
                //console.log("page : "+table.api().page())
                //page = Math.ceil(table.fnSettings()._iDisplayStart/table.fnSettings()._iDisplayLength);
                //table.api().page(2).draw(false)

                console.log($(this).parent().find("td:nth-child(2)").text())

                //console.log("cellpadding : "+ $(this).html(table.fnGetNodes()[0]))
                if ($(this).hasClass('details-control') == false && $(this).parent().hasClass('even') == true || $(this).hasClass('details-control') == false && $(this).parent().hasClass('odd') == true)
                    if ($(this).parent().hasClass('selected') != true) {
                        $(this).parent().addClass('selected');
                        selected.push($(this).parent().find("td:nth-child(2)").text());
                        //console.log("selected : "+selected)
                    }
                    else {
                        $(this).parent().removeClass('selected');
                        selected.splice(selected.indexOf($(this).parent().find("td:nth-child(2)").text()),1)
                        //console.log("selected : "+selected)
                    }
                console.log($(this).parent().text())

            })

            function format ( d ) {
                // `d` is the original data object for the row
                return '<table cellpadding="5" cellspacing="0" border="0" class="table" style="padding-left:50px;">'+
                    '<tr>'+
                    '<td class="oren">Full name:</td>'+
                    '<td>'+d.connectionId+'</td>'+
                    '</tr>'+
                    '<tr>'+
                    '<td>Extension number:</td>'+
                    '<td>'+d.connectionId+'</td>'+
                    '</tr>'+
                    '<tr>'+
                    '<td>Extra info:</td>'+
                    '<td>And any further details here (images etc)...</td>'+
                    '</tr>'+
                    '</table>';
            }

            element.on('click', 'td.details-control', function () {
                var tr = $(this).closest('tr');
                var row = table.api().row( tr );

                if ( row.child.isShown() ) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                    opened.splice(opened.indexOf($(this).parent().find("td:nth-child(2)").text()),1)
                }
                else {
                    // Open this row
                    row.child( format(row.data()) ).show();
                    tr.addClass('shown');
                    opened.push($(this).parent().find("td:nth-child(2)").text());
                }


            } );

        }
    }
})