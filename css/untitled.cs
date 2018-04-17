@using Contensis.Framework.Web

@{

//===========================================//
//=========== GLOBALS - UTILITIES ===========//
//===========================================//

string homepageDestination = "EUI homepage";
string host = HttpContext.Current.Request.Url.Host; //Live or Preview

Utilities util = new Utilities();

string api_general_url = "https://cms-eui.cloud.contensis.com/api/delivery/projects/euiWebsite/entries";
string accessToken = "Wj2QPClihD74Kfie162MRMP0gKYkk1NfYjgvz49ceGRQbAeW";
string linkDepth = "0";

string page_size = "1"; //take only the last entry
int page = 0;

//SlideShow Images Resolution Accepted
int height = 335;
int width = 940;

//SEARCH REQUEST CAROUSEL ENTRY TYPE

linkDepth = "10";
var request_url = api_general_url+"/search?accessToken="+accessToken+"&linkDepth="+linkDepth;

string publications_request_body = "{\"where\":[{\"field\": \"sys.contentTypeId\",\"equalTo\": \"homepageCarrousel\"},{\"field\" : \"sys.versionStatus\",\"equalTo\" : \"Published\"},{\"field\" : \"homepageDestination\",\"equalTo\" : \"EUI Homepage\"}],\"orderBy\": [{\"desc\": \"sys.version.modified\"}],\"pageIndex\": "+page+",\"pageSize\": "+page_size+"}";

dynamic delivery_api_response = util.searchDeliveryAPIResponse_EUI(request_body,linkDepth);
string status = delivery_api_response[0];
dynamic api_result = delivery_api_response[1];


        //POST METHOD
    try{
        dynamic response;

        var httpWebRequest = (HttpWebRequest)WebRequest.Create(request_url);
        httpWebRequest.ContentType = "application/json";
        httpWebRequest.Method = "POST";

        using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
        {
        streamWriter.Write(publications_request_body);
        streamWriter.Flush();
        streamWriter.Close();
        } 

        var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();

        //"using" Statement : Provides a convenient syntax that ensures the correct use of IDisposable objects.
        using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
        {
        response = streamReader.ReadToEnd();
        }

        dynamic Carousel = Newtonsoft.Json.JsonConvert.DeserializeObject(response);
        dynamic left_menu = Carousel.items[0].composer;
        dynamic carouselSlideshowImages = Carousel.items[0].carouselSlideshowImages;

         @: <div id="carousel-container" class="row">
         @:  <div class="tabNavWrapper col-sm-3">
         @:     <ul class="nav nav-tabs tabs-left"> 

        foreach (dynamic left_menu_item in left_menu){ //left menu items
                @: <li>
                @:      <a href="#@left_menu_item.value.title" data-toggle="tab">@left_menu_item.value.title</a>
                @: </li>
        }//end foreach left-menu

        @:      <li class="backToMain"><a href="#mainSlider" data-toggle="tab">&laquo; Back</a></li>
        @:      </ul>
        @:  </div> 
        @:  <div class="tab-content col-sm-12">
        @:      <div class="tab-pane active" id="mainSlider">
        @:          <div id="homeCarousel" class="carousel carousel-effect" data-ride="carousel">
        
        string preview_message = ""; //error messages only on preview about carousel images
        //Carousel Indicators
        @:              <ol class="carousel-indicators"> 
        int slide_indicator = 0; 
        int request_indicator = 1;
        foreach (dynamic slideshowImage in carouselSlideshowImages){
            bool show = true;
           
            string title = "";
            bool resolution = false;


            //Verifying image asset (create a method for this?)
            
            bool exists = (slideshowImage.value.imageCarousel.asset != null);
            bool published = (slideshowImage.value.published == true);

            if (exists && published) {
                title = (slideshowImage.value.imageCarousel.asset.sys.properties.filename);
                resolution = ((slideshowImage.value.imageCarousel.asset.sys.properties.width == width) && (slideshowImage.value.imageCarousel.asset.sys.properties.height == height));

            }else{
                title = null;
                resolution = false;
            }
            
            show = (published && exists && resolution);

             if (show){
                if (slide_indicator == 0){
            @:                  <li data-target="#homeCarousel" data-slide-to="@slide_indicator" class="active"></li>
                }else{
            @:                  <li data-target="#homeCarousel" data-slide-to="@slide_indicator"></li>
                }
                slide_indicator++;
            }else{
                preview_message = preview_message+"<br>  The image no"+request_indicator+" "+title+" (caption: "+slideshowImage.value.imageCarousel.caption+") cannot be shown on Live version. The property bellow is not verified: ";
                if (!exists){
                    preview_message = preview_message+" - The image does not exist or is not published.";
                }
                if(exists && published && (!resolution)){
                    preview_message = preview_message+" - The image don't respect the resolution required for the carousel. (940x335) resolution of selected image: width: "+slideshowImage.value.imageCarousel.asset.sys.properties.width+" height: "+slideshowImage.value.imageCarousel.asset.sys.properties.height ;
                }
                preview_message = preview_message+"<br>";
            }
            request_indicator++;
        }
        @:              </ol> 

        //Carousel Inner
        @:              <div class="carousel-inner"> 
        int inner_indicator = 0;

        foreach (dynamic slideshowImage in carouselSlideshowImages) {

            bool show = true;
           
            string title = "";
            bool resolution = false;


            //Verifying image asset (create a method for this?)
            
            bool exists = (slideshowImage.value.imageCarousel.asset != null);
            bool published = (slideshowImage.value.published == true);
        
            if (exists && published) {
                title = (slideshowImage.value.imageCarousel.asset.sys.properties.filename);
                resolution = ((slideshowImage.value.imageCarousel.asset.sys.properties.width == width) && (slideshowImage.value.imageCarousel.asset.sys.properties.height == height));
            }else{
                title = null;
                resolution = false;
            }
            
            show = (published && exists && resolution);

            if (show){
                if (inner_indicator == 0){
            @:                  <div class="item active">
                }else{
            @:                    <div class="item">
                }
            @:                      <a href="@(slideshowImage.value.link)"><img src="@(slideshowImage.value.imageCarousel.asset.sys.uri)" alt="@(slideshowImage.value.imageCarousel.caption)"></a>
            if (slideshowImage.value.description != null){
                @:                       <a href="@(slideshowImage.value.link)"><span  class="carousel-caption">@slideshowImage.value.description</span></a>        
            }
            @:                  </div>
                inner_indicator++;
            }
        }
        @:          </div> 
        @:      </div> 
        @:  </div> 

        foreach(dynamic left_menu_item in left_menu){
            @: <div class="tab-pane" id="@(left_menu_item.value.title)">
            @:     <div class="blockContent">
                    HtmlString blockContent = Html.Raw(left_menu_item.value.markup);
            @:      @blockContent
            @:     </div>        
            @:     <img src="@(left_menu_item.value.image.asset.sys.uri)" alt="@(left_menu_item.value.image.caption)">        
            @: </div>    
        }
        
        <div class="clearfix"></div>
        @: </div> </div>  @*Closing carousel-container *@


        if ((preview_message != "")&&(host == "preview-eui.cloud.contensis.com")){
            @: <div class="bg-info">@(Html.Raw(preview_message))</div>
        }
    }
    catch (WebException ex) {
            System.Web.HttpContext.Current.Response.Write("Error: "+ ex);
        //404 or 500  ERRROR
    }  
    catch (Exception ex) {
        // Something more serious happened On news APi- the server probably was never reached
    System.Web.HttpContext.Current.Response.Write("Error: "+ ex);
        //util.SendEmail_EUI("webunit@eui.eu", "Urgent error in the news api call.", ex.ToString());            //ENABLE THIS BEFORE LAUNCHING 
   }

}

<script>
  jQuery(function(){
    jQuery('.nav-tabs li a').on('click', function(){
      if(jQuery(this).attr('href') != '#mainSlider'){
        jQuery('.backToMain').show();
        jQuery('.carousel').carousel('pause');
      }
      else if(jQuery(this).attr('href') == '#mainSlider'){
        jQuery('.backToMain').hide();
        jQuery('.carousel').carousel('cycle');
      }
    });
  });
</script>
