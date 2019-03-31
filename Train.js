

    var config = {
      apiKey: "AIzaSyAXoX_r4YnLZKJVGZDF3z8XKxuDAOYaRTc",
      authDomain: "myfirst-mobile-app.firebaseapp.com",
      databaseURL: "https://myfirst-mobile-app.firebaseio.com",
      projectId: "myfirst-mobile-app",
      storageBucket: "myfirst-mobile-app.appspot.com",
      messagingSenderId: "758409077026"
    };
  
    firebase.initializeApp(config);
  
    var database = firebase.database();
  
    $(document).ready(function()
    {
      var mtable = $('.table-info');
      var dt = new Date();
      database.ref('Train/').once('value', function(snapshot)
  
      {
       // mdiv.append(`\n${snapshot.val().tname} ${snapshot.val().dname}`); 
     
       //  These code grab data from database and display to table
  
       snapshot.forEach(function(data)
           {
                var mtname = data.val().tname.trim();
                var mdname = data.val().dname.trim();
                var mftime = data.val().ftime.trim();
                var mttime = data.val().ttime.trim();
          
                // following code for time calculation..
               
                var m1 =mttime.substring(0,2);
                var m2 =mttime.substring(5,3);
                var dt=new Date(new Date().setHours(m1));
                                        dt.setMinutes(m2);
                var to = new Date();
         
                var ch = new Date().getHours();
                var cm = new Date().getMinutes();
                
                var result = ((Number(ch)+'.'+ Number(cm)) - (Number(m1)+'.'+Number(m2))) ;
                var st1=result.toString().split('.');
                var currentHm = (Number(st1[0])* 60) + Number(st1[1]);
                var nextArrival;
                if((currentHm % mftime) == 0)
                   {
                     var nextArrival = new Date().getHours() +':'+ new Date().getMinutes();
                   }
                else 
                   {
                       var ctime = (currentHm % mftime);
                       var newMinutes = new Date().getMinutes();
                       var newHours = new Date().getHours();
                       
                       if((newMinutes + ctime) == 60 )
                       {
                          newHours = newHours + 1;
                          newMinutes = 0;
                       }
                       else if (newMinutes + ctime > 60)
                       {
                          newHours = newHours + 1;
                          newMinutes = newMinutes - 60;
                       }
                       else if (newMinutes + ctime < 60)
                       {
                          newHours = new Date().getHours();
                          newMinutes = (new Date().getMinutes()+ ctime);
                       }
  
                       nextArrival = newHours +':'+ newMinutes;
                   }
                var tr = $('<tr>');
                var td0 = $('<td>').text(mtname);
                var td1 = $('<td>').text(mdname);
                var td2 = $('<td>').text(mftime);
                var td3 = $('<td>').text(nextArrival);      
                var td4 = $('<td>').text(newMinutes-ctime);              
                  //  console.log(newMinutes,ctime);
                tr.append(td0,td1,td2,td3,td4);
                mtable.append(tr);
           });
      });
  
      // Now I am going to write input data to the database 
  
      $('#add-train-time').on('click', function(event)
      {
          event.preventDefault();
  
          var mtname = $('#t-name-input').val().trim();
         
          var mdest = $('#destination-input').val().trim();
          var mttime =$('#train-time-input').val().trim();
          var mftime =$('#f-time-input').val().trim();
        
                  database.ref('Train/').push({
  
                  tname: mtname,
                  dname: mdest,
                  ftime: mftime,
                  ttime: mttime             
                });
  
                  
  
                var m1 =mttime.substring(0,2);
                var m2 =mttime.substring(5,3);
        
                var dt=new Date(new Date().setHours(m1));
                                        dt.setMinutes(m2);
                var to = new Date();
         
                var ch = new Date().getHours();
                var cm = new Date().getMinutes();
                if(m1<ch)
                {
                  m1=0;
                  ch=0;
                }
                var result = ((Number(ch)+'.'+ Number(cm)) - (Number(m1)+'.'+Number(m2))) ;
          
                var st1=result.toString().split('.');
                var currentHm = (Number(st1[0])* 60) + Number(st1[1]);
               
                var nextArrival;
                if((currentHm % mftime) == 0)
                   {
                     var nextArrival = new Date().getHours() +':'+ new Date().getMinutes();
                   }
                  //  ((currentHm % mftime) != 0)
                else
                   {
                       var ctime = (currentHm % mftime);
                       var newMinutes = new Date().getMinutes();
                       var newHours = new Date().getHours();
                       
                       if((newMinutes + ctime) == 60 )
                       {
                          newHours = newHours + 1;
                          newMinutes = 0;
                       }
                       else if (newMinutes + ctime > 60)
                       {
                          newHours = newHours + 1;
                          newMinutes = newMinutes - 60;
                       }
                       else if (newMinutes + ctime < 60)
                       {
                          newHours = new Date().getHours();
                          newMinutes = (new Date().getMinutes()+ ctime);
                       }
  
                       nextArrival = newHours +':'+ newMinutes;
                   }

                   var m1 = newMinutes;
                   var m2 = new Date().getMinutes();

                   mtable = $('.table-info');
                   var tr = $('<tr>');
                   var td0 = $('<td>').text(mtname);
                   var td1 = $('<td>').text(mdest);
                   var td2 = $('<td>').text(mftime);
                   var td3 = $('<td>').text(nextArrival);
                   var td4 = $('<td>').text(m2-m1);    
     
                   tr.append(td0,td1,td2,td3,td4);
                   mtable.append(tr);
  
                  $('#t-name-input').val(" ");
                  $('#destination-input').val(" ");
                  $('#train-time-input').val(" ");
                  $('#f-time-input').val(" ");
      }); 
      
    });