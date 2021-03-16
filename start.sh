declare -a apps=("app-root" "app-first" "app-second")

for app in "${apps[@]}"; do
  echo "Starting" ${app} "(dev mode)..."
  if [ ! -d "${app}" ]; then
    echo "MicroApp not existing!"
  else
    cd ${app}
    npm start &
    cd ..
  fi
  echo "############"
done
