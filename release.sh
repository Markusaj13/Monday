set -e


fg_black="$(tput setaf 0)"
fg_red="$(tput setaf 1)"
fg_green="$(tput setaf 2)"
fg_yellow="$(tput setaf 3)"
fg_blue="$(tput setaf 4)"
fg_magenta="$(tput setaf 5)"
fg_cyan="$(tput setaf 6)"
fg_white="$(tput setaf 7)"
reset="$(tput sgr0)"


echo "${fg_magenta}Copying.. rusty/target/release/rusty to release/rusty ${fg_white}"
cp rusty/target/release/rusty release/rusty

echo "${fg_magenta}Copying.. dist to release/dist ${fg_white}"
cp -r dist release/dist

echo "${fg_magenta}Copying.. resources to release/resources ${fg_white}"
cp -r resources release/resources

echo "${fg_magenta}Copying.. html to release/html ${fg_white}"
cp -r html release/html

echo "${fg_magenta}Copying.. data to release/data ${fg_white}"
cp -r data release/data

echo "${fg_magenta}Copying.. index.html to release/index.html ${fg_white}"
cp index.html release/index.html

