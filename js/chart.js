$(function(){
    var bl=window.localStorage.getItem("bl");
    var username=window.localStorage.getItem("username");
    var listnings=0;
    if(window.localStorage.getItem("listnings")){
        listnings=window.localStorage.getItem("listnings");
    }
    var matchings=0;
    if(window.localStorage.getItem("matchings")){
        matchings=window.localStorage.getItem("matchings");
    }
    var singleSlections=0;
    if(window.localStorage.getItem("singleSlections")){
        singleSlections=window.localStorage.getItem("singleSlections");
    }
    var total=(listnings*1)+(matchings*1)+(singleSlections*1);

    if(bl=="true"){
        $.ajax({
            url:"http://127.0.0.1:5000/createChart",
            method:"POST",
            data:{
                "name":username,
                "listnings":listnings,
                "matchings":matchings,
                "singleSlections":singleSlections
            },
            success:function(res){
                window.localStorage.setItem("bl",false);
                $("#listening").html(listnings);
                $("#matching").html(matchings);
                $("#singleSelect").html(singleSlections);
                $("#total").html(total);

                $("#map").html(`
                    <h1 style="width: auto;">${username}</h1>
                    <img src="./images/result/${username}_bar3d.png" style="width: 60%;">
                    <img src="./images/result/${username}_heatmap.png" style="width: 60%;">
                    <img src="./images/result/${username}_radar.png" style="width: 60%;">
                `);
            }
        });
    }else{
        $("#listening").html(listnings);
        $("#matching").html(matchings);
        $("#singleSelect").html(singleSlections);
        $("#total").html(total);
        $("#map").html(`
            <h1 style="width: auto;">${username}</h1>
            <img src="./images/result/${username}_bar3d.png" style="width: 60%;">
            <img src="./images/result/${username}_heatmap.png" style="width: 60%;">
            <img src="./images/result/${username}_radar.png" style="width: 60%;">
        `);
    }
});