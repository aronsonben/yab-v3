# Yelp Audience Builder (YAB) v3

My third (fourth) attempt at creating this Yelp search-by-category app. 

## Development Notes

All development notes for my personal perusal are found below.

### **Frontend**

Nothing yet.

### **Backend**

To start the backend development environment:
```
1. . venv/bin/activate
2. cd .. /* back to top level */
3. flask run
```
*Note: This is using a workaround to export the env variables, including YELP_KEY. **TODO!***

#### Testing

When trying to test, use `python -m pytest tests/` from the root directory.

## Important Links

All links that have been or will be very important for development are found below.

### **Frontend**

I've decided to learn TypeScript I guess, so here are some important links:

*Note: I've ordered them in order that I should read them.*

1. [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) ✅ (*read the basics*)
2. [React Doc's TypeScript page](https://reactjs.org/docs/static-type-checking.html#typescript) ✅ (*added to project*)
3. [chibicode's beginner tutorial](https://ts.chibicode.com/todo/) ✅ (*finished*)
4. [React + TypeScript Cheatsheets](https://github.com/typescript-cheatsheets/react#reacttypescript-cheatsheets) (*finished prereq, keep reading*)
5. [create-react-app + TypeScript](https://create-react-app.dev/docs/adding-typescript) ✅ (*finished*)


#### *Developer Tools & Project Setup*
Note: It might not be a bad idea for me to get more familiar with industry-standard development tools and resources.

* [ESLint](https://eslint.org/docs/user-guide/getting-started)
* [ESLint: eslint-config-airbnb-typescript](https://www.npmjs.com/package/eslint-config-airbnb-typescript)
* [React Debugging with VS Code](https://create-react-app.dev/docs/setting-up-your-editor#visual-studio-code)
* [Prettier](https://github.com/prettier/prettier) (*ESLint config for coding style, probably not needed*)


#### *Other Links*

* [Material-UI](https://material-ui.com/components/grid/)
* [Proxying API Requests in Development (create-react-app)](https://create-react-app.dev/docs/proxying-api-requests-in-development/)
* [MUI v5 styles](https://mui.com/guides/migration-v4/#migrate-from-jss)
* [MUI v5](https://mui.com/guides/migration-v4/#themeprovider-setup)

### **Backend**

1. [Flask Testing Tutorial](https://flask.palletsprojects.com/en/2.0.x/tutorial/tests/)