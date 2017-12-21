<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script>
  var FOLDER_ID = '1LbxUXWA9QqVVyPv_t8CEFBTo4KUHgm78';    // the folder files reside in
  var CLIENT_ID = '313877411412-flernhv1q2k3eg6hnjvq1h7bg31pgb3n.apps.googleusercontent.com';
  var SCOPE =    //'https://www.googleapis.com/auth/drive'; 
  [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',     // for description, 
  ];

  function rsvpCB(resp) {
    var picAlbumLst = '<ul>\n';
    for (i=0; i<resp.items.length; i++) 
      picAlbumLst += (
      '  <li>'+resp.items[i].id+',&nbsp;'+resp.items[i].title+',&nbsp;'+resp.items[i].description+'</li>\n');
    picAlbumLst += "</ul>\n";
    $('#container').append(picAlbumLst);
  }
  function rqstCB() {   //test @ https://developers.google.com/drive/v2/reference/files/list
    var rv = gapi.client.drive.files.list({
      'q': '"'+FOLDER_ID+'" in parents and trashed = false',
      'fields' : 'items(id,title,description)'   //'items(id,title,description,indexableText)'   
    }).execute(rsvpCB);
  }
  // authorization server reply
  function onAuthResult(authResult) {
    var authButton = document.getElementById('authorizeButton');
    authButton.style.display = 'none';
    if (authResult && !authResult.error) {  // access token successfully retrieved
      gapi.client.load('drive', 'v2', rqstCB);   
    } else {  // no access token retrieved, force the authorization flow.
      authButton.style.display = 'block';
      authButton.onclick = function() {
        checkAuth(false);
      }
    }
  }
  // check if the current user has authorized the application.
  function checkAuth(bNow) {
    gapi.auth.authorize({'client_id':CLIENT_ID, 'scope':SCOPE, 'immediate':bNow}, onAuthResult);
  }
  // called when the client library is loaded, look below
  function onLoadCB() { 
    checkAuth(true); 
  }
</script>
<script src="https://apis.google.com/js/client.js?onload=onLoadCB"></script>
<body style="background-color: transparent;">
  <input type="button" id="authorizeButton" style="display: none" value="Authorize" />
  <div id="container">
  </div>
</body>