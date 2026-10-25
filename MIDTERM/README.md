# Midterm Project: To-Eat List

A to-do list or checking list for restaurants. Every place I have saved on Google Maps goes on
the list, sorted by cuisine. I tick it off when I have been, and rate it.

**Who it is for:** anyone (me) with a long Google Maps "Want to go" list who
never remembers what is on it, what they have already tried, or what was good.

## User story

As someone who has collected over a hundred restaurants on Google Maps, I always can't recall which restaurants I have eaten at and which I haven't. Therefore, I hope to organize it into a list of restaurants to help me better remember the ones I have eaten at and those I haven't, and at the same time know which ones are worth visiting a second time

## Run it

Two terminals, both from this folder:

```bash
npm install 
npm run server       # terminal 1: json-server on http://localhost:3001
npm run dev          # terminal 2: the app, usually http://localhost:5173
```

If the page says *"Could not reach the server"*, `npm run server` is not running.

## Props or Context?

**Props.** I keep all shared state like the restaurant list, filters, sort settings, loading status and errors in the top-level `App` component. Data only travels down at most three levels: `App` → `TodoList` → `TodoItem` → `TodoEdit`. I pass callbacks like `onEdit` and `onRate` through props; it adds just a small amount of code, and I can easily follow where every piece of data comes from. Using Context would hide this clear data flow and would not bring much benefit for this project. I leave local state inside its own component when no other part of the app needs it; for example, whether an edit form is open sits in `TodoItem`, and unfinished form input stays in `TodoCreate` or `TodoEdit` until the user submits.

## Developer checklist (written before coding)

1. Write the user story; decide the fields: `category` (select) and `rating`
   (select).
2. Add a cuisine select to `TodoCreate` with its own state.
3. Send `category` in the POST body in `api.js`.
4. Show the cuisine and the rating in `TodoItem`.
5. Add the cuisine select to `TodoEdit`.
6. A cuisine filter dropdown in `App`.
7. README.

## Revised checklist (what it actually took)

1. Write the user story; the fields are `category` and `rating`.
2. `TodoCreate`: add a cuisine dropdown (controlled), send `{title, category}`.
3. `api.js` and `App`: POST `category` and `rating: 0`.
4. `TodoEdit`: add the same dropdown, with a fallback for old rows that
   have no `category`.
5. Edit saves with PUT, so send the whole record (`{...todo, ...changes}`)
   or `rating` and `done` get wiped.
6. `TodoItem`: show the cuisine tag, and the star rating only for visited
   places. Turn the rating back into a number (`Number(...)`).
7. `App`: a cuisine filter and a "Top rated" sort.
8. Other option to add a new cuisine.
9. Fix: the page reloaded after every click because `db.json` changed, so
   Vite ignores `db.json` now.
10. Restyle, with one colour per cuisine tag.
11. Fill `db.json` with my saved Google Maps places; update this README.

## What I forgot


## What I would add with another week

- A short note per visit. 
- A quick way to add many places at once.
- Clicking on the restaurant then automatically redirects to Google Maps.
