# Replaces all tabs with 2 spaces.
# From http://stackoverflow.com/questions/11094383/how-can-i-convert-tabs-to-spaces-in-every-file-of-a-directory

cd units
find . -name 'index.html' -exec ex '+%s/\t/  /g' -cwq {} \;
