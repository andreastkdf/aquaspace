@using System;
@using System.Web;
@using System.Globalization;

@{
  //===========================================//
  //=========== GLOBALS - UTILITIES ===========//
  //===========================================//

  string newsDynamicEndpoint="/NewGenerationSite/Razor/WorkInProgress/News-API/news-api";
  string accessToken = EUI_Globals.DELIVERY_API_ACCESS_TOKEN;
  string linkDepth = "0";
  string api_general_url = EUI_Globals.DELIVERY_API_SEARCH_URL;
  string no_image = "/NewGenerationSite/i/no-image.png";
  
  Utilities util = new Utilities();


//===================================//
//=========== URL REQUEST ===========//
//===================================//

  //Read the parameters from the url to see what is requested
  string request_body = "";
  string news_id = Request.QueryString["news_id"];
  string req_dep = Request.QueryString["dep"];
  var req_dep_values = Request.QueryString.GetValues("dep");
  int page = !string.IsNullOrEmpty(Request.QueryString["page"]) ? Convert.ToInt32(Request.QueryString["page"]) : 1;


//===========================================//
//=========== NEWS SINGLE REQUEST  ==========//
//===   Generates a single page for the   ===//
//===         news id specified           ===//
//===========================================//

  if (news_id != null) {  
    linkDepth = "10"; //access to all "deep" fields (images, etc.)

    string single_entry_url = api_general_url+"/"+news_id+"/?accessToken="+accessToken+"&linkDepth="+linkDepth;
    string host = HttpContext.Current.Request.Url.Host;
    dynamic news_api_response = util.getAPIResponse_EUI(single_entry_url);
    
    //NEWS FIELDS
    string img_uri = ""; 
    string img_caption = "";
    string title = news_api_response.title;
    string subtitle = news_api_response.subtitle;
    HtmlString content = Html.Raw(news_api_response.markup);
    string link = news_api_response.link;

    //Image Tests
    if (news_api_response.image.asset != null){ //check if there is an image that is actually published
                                                  //  more TODO here in near future (button in front end to publish? auto publish??)
                                                  // see the workflows before any change
      img_uri = news_api_response.image.asset.sys.uri;
      img_caption = news_api_response.image.caption;
    }else{
      img_uri = no_image;
      img_caption = "no_image";
    }

  // CurrentContext.Page.Title = title +" • European University Institute" ;
    
  //Output
    @:  <div class="clearfix"> 
    @:    <h1>@title</h1>
    DateTime dateOnly = news_api_response.sys.version["published"];
    string date = dateOnly.ToString("dd MMMMMMMMMM yyyy", CultureInfo.InvariantCulture);
    @:  <time datetime=@date>@date</time><span>
    dynamic dep_items = news_api_response.deps;
    foreach (dynamic dep in dep_items) {
      @: - <a class="affiliation affil-@(dep.codename)" href='@dep.indexPage' title='@dep.codename' >@dep.name</a> 
    } 
    @:</span>
    @:    <h3 class="NewsSingleSubtitle">@subtitle</h3>
    @: </div>
    if(img_uri != null){
      @:<div class="news_entry_image"><img src="@img_uri" alt="@img_caption"/></div>
      }else if (host == "preview-eui.cloud.contensis.com"){
        @: <div class="bg-info">Please publish your image.</div>
      }
      @:    <div class="news_main_content">@content
      if (link != null){
        @:    <p>
        if (link.Contains("events")){
          @:<a class="btn btn-eui" href="@link" title="Go to event: @title"><i class="fa fa-link"></i> Go to event page</a></p>
        }else{
          @:<a class="btn btn-eui" href="@link" title="Read more about: @title"><i class="fa fa-link"></i> Read more</a></p>
        }
      }
      @:  </div>


//=============================================================//
//=========== SIDEBAR LIST OR NEWS PAGE ("archive") ===========//
//=============================================================//

    }else{ 

  dynamic deps = null;
  string page_size = "5"; //default

//Page news : Requested FROM URL

  if (req_dep != null ){ 
    List<string> dep_to_list = new List<string>(req_dep_values); //convert url paramaters to list 
    deps = dep_to_list;
    page_size = "10"; 

//Sidebar list : Configured from Razor Properties

  }else{
    deps = Properties.Department; 
    page_size = Properties.Number;   //news to show
  }

//Filter news by department(s)/service(s) - create json query
  if (deps[0] != "all"){
    
    string deps_query_field = "{\"or\": ["; //openning OR condition
    //Creating deps field string request for API
    if (deps.Count > 1){
    //for each deps choosen
      foreach (string id in deps){
        deps_query_field += "{\"field\":\"deps[].sys.id\", \"equalTo\":\""+id+"\" },";
      }
      deps_query_field += "]}"; //close OR
    }else{
      deps_query_field = "{\"field\":\"deps[].sys.id\",\"equalTo\":\""+deps[0]+"\"}";
    }
    
      //Search query : get news by Deps&Serv asked from the user (Properties or URL) 
      //Possible update : On dev removed "Published" value for sys.properties.versionStatus and add "Latest" for sys.versionStatus
    request_body = "{\"where\":[{\"field\": \"sys.contentTypeId\",\"equalTo\": \"news\"},"+deps_query_field+",{\"field\" : \"sys.versionStatus\",\"equalTo\" : \"Published\"}],\"orderBy\": [{\"desc\": \"sys.version.published\"}],\"pageIndex\": "+(page-1)+",\"pageSize\": "+page_size+"}";

//All News
  }else{ 
    ////Search query: all news published (EUI ALL NEWS)
   request_body = "{\"where\":[{\"field\": \"sys.contentTypeId\",\"equalTo\": \"news\"},{\"field\" : \"sys.versionStatus\",\"equalTo\" : \"Published\"}],\"orderBy\": [{\"desc\": \"sys.version.published\"}],\"pageIndex\": "+(page-1)+",\"pageSize\": "+page_size+"}";
 }
linkDepth = "10"; 
dynamic delivery_api_response = util.searchDeliveryAPIResponse_EUI(request_body,linkDepth);
//System.Web.HttpContext.Current.Response.Write("Response: "+ delivery_api_response[0]); //debuging

string status = delivery_api_response[0];
dynamic api_result = delivery_api_response[1];


if(status == "Success"){

  dynamic NewsResult = api_result;
  dynamic news_list = NewsResult.items;

  @:  <div class="row">
  @:    <div class="large-2 columns developer">Dev. Mode Infos:<br>Titles:<br>
  foreach (dynamic elt in news_list){
    @: <br> @elt.title <br> IMAGE REQUEST :
    if (elt.image.asset != null){
      string url_img = elt.image.asset.sys.uri;
      @:  @url_img;
    }
    @:
  }
  @: <br><br>THE REQUEST BODY: <br>
  @:          @request_body
  @:    </div>
  @:  </div> 
  if (req_dep == null){
    @:<div class="NewsSideBarWrapper">
    @:  <h3>Latest News Sidebar</h3>
    @:  <hr class="fancy-hr"/>
  }else{
    @:<div class="NewsListWrapper">
    @:  <h3>News</h3>
  }

  foreach (dynamic elt in news_list){

    //GET IMAGE URL if the image is published
    string id = elt.sys.id;
    string news_single_url=newsDynamicEndpoint+"?news_id="+id;
    string url_img = no_image;

      if (elt.image.asset != null){ //checks if the image selected from the gallery is published
        url_img = elt.image.asset.sys.uri;
      }   
      if (req_dep == null) {
        @:  <div class="NewsSidebarItem clearfix"> 
        @:    <div class="pull-left NewsImageWrapper" style="background-image: url('@url_img')"></div>
        @:<h5>
      }else{
        @:    <div class="NewsListItem card clearfix"> 
        @:    <div class="pull-left NewsImageWrapperList" style="background-image: url('@url_img')"></div>
        @:<h3>
      }
      @:      <a href="@news_single_url" title=@elt.title>@elt.title</a>
      //change link to single entry for title 
      DateTime dateOnly = elt.sys.version["published"];
      string date = dateOnly.ToString("dd MMM yyyy", CultureInfo.InvariantCulture);
      
      //If list of news show departments/services 
      if(req_dep != null){
        @:  <br><small><time datetime=@date>@date</time>
        
        dynamic dep_items = elt.deps;
        foreach (dynamic dep in dep_items) {
          @: - <a class="affiliation affil-@(dep.codename)" href='@dep.indexPage' title='@dep.codename' >@dep.name</a> 
        }    
        @:    </small></h3>
      }else{
        @:  <small><time datetime=@date>@date</time>
        @:    </small></h5>
      }

  //keep date, not time
      @:    <p>@elt.subtitle</p>
      @:  </div>
  } //end of foreach

  //Output All News Button for Sidebar List
  if (req_dep == null){ 
    string dep_parameters = "";
      foreach (var dep_ser in deps) { //create the request for the list page, deps --> from the Properties in this case
        dep_parameters += "dep="+dep_ser+"&"; 
      }
      @:    <p><br><a class="btn btn-eui" href="@(newsDynamicEndpoint)?@(dep_parameters)" title="Go to all news page" >All news</a></p>  
      
      
  //List of news output - Pagination configuration
    }else{ 
      int count_news = NewsResult.totalCount;
      int pageSize = NewsResult.pageSize;
      int pageIndex = NewsResult.pageIndex;
      int first = (pageIndex*(pageSize))+1;
      int last = (pageSize*(pageIndex+1));

      if (count_news < last) {
        last = count_news;
      }
      string current_url = HttpContext.Current.Request.Url.ToString();
      int max_page_index = count_news/pageSize;
    //  if ((count_news%pageSize)>0){
    //    max_page_index += 1;
    //  }

      @: @Html.Raw(util.EUI_RenderPaginationWithInfo(page, max_page_index, first, last, pageSize, count_news))
      
    }
    @:</div>
  }else{
    util.SendEmail_EUI("andrea.kostakis@eui.eu", "Urgent error in the news api call.",api_result);   //ENABLE THIS BEFORE LAUNCHING
  }
}
//ERROR HANDLING

      //  System.Web.HttpContext.Current.Response.Write("Error: "+ ex);
    //404 or 500  ERRROR


    // Something more serious happened - the server probably was never reached
  //System.Web.HttpContext.Current.Response.Write("Error: "+ ex);
  //util.SendEmail_EUI("webunit@eui.eu", "Urgent error in the news api call.", ex.ToString());   //ENABLE THIS BEFORE LAUNCHING 
}


<style>

  /*
==================================================================================================
NEWS STYLE : DO BE COPIED TO A PROPER CSS FOR NEWS.
==================================================================================================
*/
.NewsImageWrapper{
  margin: 12px 10px 12px 0;
  width: 70px;
  height: 70px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.NewsImageWrapperList{
  margin: 12px 10px 12px 0;
  width: 100px;
  height: 100px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.NewsSidebarItem {
  border-bottom: 1px solid #DDD;
  color: #788b8b;
  font-size: 12px;
}

.NewsListItem {
  color: #788b8b;
  font-size: 12px;
}


.developer{
  display:none;
  background-color: #108cc84d;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: #108CC8;
}

.news_main_content{
  font-size: 14px;
}

.NewsSingleImageWrapper {
  margin: 0px 50px 30px 0;
  width: 120px;
  height: 120px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}


.NewsSingleSubtitle{
  line-height: 1.3;
  margin-bottom: 15px;
}

.news_entry_image{

}


/*
==================================================================================================
PAGER : TO BE DELETED, HERE JUST FOR DEMO
==================================================================================================
*/
.directoryListing .sys_paginginfo{
  font-size:12px;
  line-height:28px;
  color:#4A4A4A;
  margin-bottom:15px;
}
.directoryListing .sys_flickrpager .sys_navigation{
  float:none;
  display:inline-block;  
}
.directoryListing .sys_flickrpager .sys_navigationnext{
  display:inline-block;
  vertical-align:top;
  position:relative;
  height:28px;
  line-height:28px;
}
.sys_flickrpager .sys_page{
  background-color:#fff;
  margin-right:5px;
  overflow:hidden;
  border:1px solid #ccc;
  text-align:center;
  line-height:28px;
  display:inline-block;
  width:28px !important;
  height:28px !important;
}
.sys_flickrpager .sys_page a,
.sys_flickrpager .sys_page > span{
  position:relative;
  bottom:1px;
  color:#0085C2;
  width:28px;
}
.sys_flickrpager .sys_page a:hover{
  color:#fff;
  background:#4d4d4d;
  width:28px;
}
.sys_flickrpager .sys_page.sys_selected > span,
span.sys_pagerInfo{
  color:#4d4d4d;
}
.sys_flickrpager .sys_navigationnext,
.sys_flickrpager .sys_navigationprevious{
  position:relative;
  background-image:none !important;
}
.sys_flickrpager .sys_navigationnext span,
.sys_flickrpager .sys_navigationprevious span,
.sys_flickrpager .sys_navigationnext a,
.sys_flickrpager .sys_navigationprevious a{
  font-size:0;
}
.sys_flickrpager .sys_navigationnext{
  margin-left:20px;
  margin-right:10px;
}
.sys_flickrpager .sys_navigationprevious{
  margin-right:20px;
  height:28px;
  line-height:28px;
}
.sys_flickrpager .sys_navigationnext a:after,
.sys_flickrpager .sys_navigationnext > span:after,
.sys_flickrpager .sys_navigationprevious a:before,
.sys_flickrpager .sys_navigationprevious > span:before{
  content:"";
  width:0;
  height:0;
  border-style:solid;
  display:inline-block;
}
.sys_flickrpager .sys_navigationprevious a:before,
.sys_flickrpager .sys_navigationprevious > span:before{
  margin-right:10px;
  border-width:5px 10px 5px 0px;
  border-color:transparent #004a7c transparent transparent;  
}
.sys_flickrpager .sys_navigationnext a:after,
.sys_flickrpager .sys_navigationnext > span:after{
  margin-left:10px;
  border-width:5px 0 5px 10px;
  border-color:transparent transparent transparent #004a7c;
}
.sys_flickrpager .sys_navigationnext a span, 
.sys_flickrpager .sys_navigationprevious a span, 
.sys_flickrpager .sys_navigationnext span span, 
.sys_flickrpager .sys_navigationprevious span span{
  display:none;
}
.sys_flickrpager .sys_disabled{
  opacity:0.5;
  color:#999999;
}

</style>