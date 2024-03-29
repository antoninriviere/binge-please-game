// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true
    },
    extends: ['eslint:recommended'],
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // check if imports actually resolve
    'settings': {
        'import/resolver': {
        'webpack': {
            'config': 'build/webpack.base.conf.js'
        }
        }
    },
    // add your custom rules here
    'rules': {
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-unused-vars': 1,
        'no-console': 0,
        'dot-notation': 1,
        'eqeqeq': 1,
        'no-else-return': 0,
        'no-new-func': 1,
        'no-param-reassign': [1, { props: false }],
        'no-useless-concat': 1,
        'no-useless-escape': 1,
        'radix': [1, 'as-needed'],
        'no-undef': 2,
        'array-bracket-spacing': [1, 'never'],
        'brace-style': [1, 'allman'],
        'camelcase': [1, { properties: 'always' }],
        'comma-dangle': [1, 'never'],
        'comma-style': [1, 'last'],
        'func-style': [1, 'expression'],
        'id-length': 0,
        'indent': [1, 4, { SwitchCase: 1 }],
        'keyword-spacing': [1, { after: false, before: true, overrides: { from: { after: true }, return: { after: true }, import: { after: true }, case: { after: true } } }],
        'max-len': 0,
        'new-cap': [1, { newIsCap: true, newIsCapExceptions: [], capIsNew: false, capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List'] }],
        'no-array-constructor': 1,
        'no-bitwise': 0,
        'no-mixed-operators': 0,
        'no-nested-ternary': 0,
        'no-new-object': 1,
        'no-plusplus': 0,
        'no-restricted-syntax': 0,
        'no-trailing-spaces': 1,
        'no-underscore-dangle': 0,
        'no-unneeded-ternary': 1,
        'no-whitespace-before-property': 1,
        'object-curly-spacing': [1, 'always'],
        'one-var': [1, 'never'],
        'padded-blocks': [1, 'never'],
        'quote-props': [1, 'as-needed'],
        'quotes': [1, 'single'],
        'semi': [1, 'never'],
        'space-before-blocks': [1, 'always'],
        'space-before-function-paren': [1, { anonymous: 'never', named: 'never', asyncArrow: 'never' }],
        'space-in-parens': [1, 'never'],
        'space-infix-ops': 1,
        'spaced-comment': [1, 'always'],
        'arrow-body-style': 0,
        'arrow-parens': [1, 'always'],
        'arrow-spacing': [1, { before: true, 'after': true }],
        'no-confusing-arrow': 0,
        'no-dupe-class-members': 1,
        'no-duplicate-imports': 0,
        'no-useless-constructor': 1,
        'no-var': 1,
        'object-shorthand': 0,
        'prefer-const': 1,
        'prefer-rest-params': 1,
        'prefer-spread': 1,
        'prefer-template': 0,
        'template-curly-spacing': [1, 'never']
    },
    'globals': {
        'Promise': false,
        'TimelineLite': false,
        'TimelineMax': false,
        'TweenLite': false,
        'TweenMax': false,
        'Back': false,
        'Bounce': false,
        'Circ': false,
        'Cubic': false,
        'Ease': false,
        'EaseLookup': false,
        'Elastic': false,
        'Expo': false,
        'Linear': false,
        'Power0': false,
        'Power1': false,
        'Power2': false,
        'Power3': false,
        'Power4': false,
        'Quad': false,
        'Quart': false,
        'Quint': false,
        'RoughEase': false,
        'Sine': false,
        'SlowMo': false,
        'SteppedEase': false,
        'Strong': false,
        'Draggable': false,
        'SplitText': false,
        'VelocityTracker': false,
        'CSSPlugin': false,
        'ThrowPropsPlugin': false,
        'BezierPlugin': false
    }
}
