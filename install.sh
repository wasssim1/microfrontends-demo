declare -a apps=("app-root" "app-first" "app-second")

for app in "${apps[@]}"; do
  echo "installing" ${app} "dependencies..."
  if [ ! -d "${app}" ]; then
    echo "MicroApp not existing!"
  else
    cd ${app}
    npm i
    cd ..
  fi
  echo "############"
done
