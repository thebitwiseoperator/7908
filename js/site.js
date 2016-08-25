/***** -- This object is considered a CORE member. You probably don't need to modify this. Read the doc. -- ******/
var GSIDefaults = {
    //The name of the training. Is written into the browser title. 
    trainingName: "Default Training Name",
    //The name of the product. This is in the main navigation. 
    productName: "Default Product Name",
    //The name of the model of the product. This is not yet used. 
    modelName: "Default Model Name",
    //The default fade duration for the legal modal window. Can take 'fast', 'slow' or an int.
    fadeDuration: "slow",
    language: "",
    //This function will instantly write the product name wherever it's invoked. For now, in the main navigation.
    writeProductName: function () {
        document.write(GSI.productName);
    },
    //This function opens the legal modal.
    openLegal: function () {
        $("#legal").load("html/legal.html");
        $("#legal").fadeIn(GSIDefaults.fadeDuration);
    },
    closeLegal: function () {
        $("#legal").fadeOut(GSIDefaults.fadeDuration);
    },
    //This function will instantly switch the HTML of the main-content division whenever it's invoked.
    switchPage: function (pageName) {
        /*If the page name is home use the content from index.html otherwise use the content from the HTML folder 
        where 'pageName' is the name of the file sans the extension. */
        $('#main-content').load('html/' + pageName + '.html');
    },
    //This function sets the site title. 
    changeSiteTitle: function () {
        document.title = GSI.trainingName;
    },
    setLanguage: function (language) {
        GSI.language = language;
    },
    writeCurrentLanguage: function () {
        document.write(GSI.language);
    },
    enableSubNavSlide: false
};
/***** -- This is the 'options' version of the GSIDefaults object. You may modify this. -- ******/
var GSIOptions = {
    trainingName: "LG Styler",
    productName: "LG Styler",
    fadeDuration: "fast",
    //Are we going to show sub-navigation on this page? Pass true as yes, false as no.
    enableSubNavigation: function (bool) {
        bool ? (
            $("#sub-navigation").css("display", "block"),
            $("#sub-navigation-toggle-container").css("display", "block")
        ) : (
            $("#sub-navigation").css("display", "none"),
            $("#sub-navigation-toggle-container").css("display", "none")
        );
    },
    //This just slides the sub-navigation. You should probably leave this alone. 
    slideSubNavigation: function () {
        if (GSIDefaults.enableSubNavSlide) {
            if ($("#sub-navigation").css('left') === '844px') {
                $("#sub-navigation").animate({
                    'left': '100px'
                }, 'slow');
            } else {
                $("#sub-navigation").animate({
                    'left': '844px'
                }, 'slow');
            }
            $("#sub-navigation-toggle").toggleClass('sub-navigation-toggle-closed');
        }
    },
    // This is what the module does when the user presses the logo. 
    resetTraining: function () {
        videoControl.stopIndex = 0;
        GSI.switchPage('landing-page');
        $(".closed-captions-button-off").removeClass('closed-captions-button-on');
    }
};
/*This creates the GSI object and combines GSIDefaults and GSIOptions. It does not modify GSIDefaults.*/
var GSI = $.extend({}, GSIDefaults, GSIOptions);