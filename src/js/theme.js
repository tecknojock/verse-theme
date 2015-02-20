/*!
*
* Tumblr theme
* 
*/
(function () {

  // Responsive content
  var selectors = "";
  
  var addSelector = function(domainName) {
    selectors += "iframe[src*='" + domainName + "'], ";
  };
  var trimCharacters = function(str, amount) {
    return str.slice(0, -1 * amount);
  }

  addSelector("vine.co");
  addSelector("tumblr.com");
  addSelector("instagram.com"); 
  addSelector("dailymotion.com"); 
  addSelector("soundcloud.com");
  addSelector("embed.spotify.com");
  
  selectors = trimCharacters(selectors, 2); 
  
  $('.embed-wrapper').fitVids({ customSelector: selectors });
  
  // Responsive photosets
  $('.photoset-grid').photosetGrid({
      highresLinks: true,
      rel: $('.photoset-grid').attr('data-id'),
      gutter: '15px'
  });
}());