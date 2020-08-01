# Supreme monitor

This is a monitor for supreme.

## How to use

- Run `npm install`. Make sure that you have npm installed before doing this, you can download it for free with Node.JS (which is also necessary).
- Run `npm run build`. This builds the files and outputs it in the `dist` folder.
- Place your webhooks in files named `webhooks_main.txt` and `webhooks_filtered.txt`, for unfiltered and filtered, respectively. These will all go in the `dist` folder.
- Place your filters in a file named `filters.txt`. This is in the `dist` folder. Note that the filters are separated by lines breaks, not by commas.
  - Note: the filtering algorithm is not very complex, as I don't do stuff with matching spelling errors, etc, so please make sure that everything is spelled correctly.
- Place your proxies in a file named `proxies.txt`. This is also in the `dist` folder.
- To run the monitor, run `supreme-setting.js`. Setting is either `main` or `filtered`. This will be in the `dist` folder. Tools like `pm2` can be used to keep this process alive forever, or at least until it is stopped or the computer turns off.

## Advanced config

To change how often a monitor checks for restocks, you have 2 options:
- Edit the `dist/supreme-setting.js` file directly - this is faster, and does not require rebuilding, but note that your changes will be overridden in the next build
- Edit the `src/supreme-setting.ts` file - this requires you to run `npm run build` again, but your changes will be saved.

Which line to find the intervals:
- Source
  - Main - 16
  - Filtered - 26
- Compiled
  - Main - 36
  - Filtered - 46

Note that the interval is in milliseconds (e.g. 5000 milliseconds is 5 seconds)