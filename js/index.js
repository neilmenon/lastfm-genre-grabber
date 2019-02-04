// Copyright © 2018 Neil Menon
// http://neilmenon.com
// https://github.com/neilmenon
$("#mainSearch").submit(function(e) {
    e.preventDefault();
});

function grabGenres()
{
  $( ".output" ).empty();
  $('.output').append('<p class="message"></p>');
  var api_key = "YOUR_LAST.FM_API_KEY";
  var input = document.getElementById("artistInput").value;
  input = input.trim();
  console.log(input);
$.getJSON('https://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=' + input + '&api_key=' + api_key + '&format=json',function(data) {
  console.log(data);
  var attr = "@attr";
  var artist = data.toptags[attr].artist;
  var artist_lower = artist.toLowerCase();
  console.log("Artist: " + artist)
  var count = data.toptags.tag.length;
  console.log("# of Genres Found: " + count)
  if(count > 0)
    {
      $('.message').html("Showing genres for " + artist + ".<br>View " + artist + " on: <a href='https://www.sputnikmusic.com/search_results.php?genreid=0&search_in=Bands&search_text=" + artist + "&x=0&y=0' target='_blank'>Sputnik</a> / <a href='https://rateyourmusic.com/search?bx=ae8884ce3aed789ef289ec150822cff6&searchtype=a&searchterm=" + artist + "' target='_blank'>rym</a> / <a href='https://www.metal-archives.com/search?searchString=" + artist + "&type=band_name' target='_blank'>MA</a>.");
      $.each(data.toptags.tag, function(index, value)
             {
        var init_genre = value.name.toLowerCase();
        if(init_genre != "seen live" && init_genre != artist_lower)
        {
          var genre = value.name.toLowerCase();
          var count = value.count;
          console.log(genre + " (" + count + ")");
          $('.output').append('<p class="genre">' + genre + " (" + count + ")" + '</p>');
        }
      });
    }
  else
    {
      $('.message').html("Genres for " + artist + " not found.<br>Try <a href='https://www.sputnikmusic.com/search_results.php?genreid=0&search_in=Bands&search_text=" + artist + "&x=0&y=0' target='_blank'>Sputnik</a> / <a href='https://rateyourmusic.com/search?bx=ae8884ce3aed789ef289ec150822cff6&searchtype=a&searchterm=" + artist + "' target='_blank'>rym</a> / <a href='https://www.metal-archives.com/search?searchString=" + artist + "&type=band_name' target='_blank'>MA</a>.");
    }
});
}
