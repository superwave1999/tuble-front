export default {
    button: {
        submit: 'Validate',
        close: 'Close'
    },

    complete: {
        title: 'Pipe connected!'
    },

    action: {
        finished: 'Pipe connected! Return tomorrow for a new challenge.'
    },

    snackbar: {
        submitError: 'That doesn\'t seem quite right... Keep going!',
    },

    loading: 'Loading...',

    help: {
        title: 'How to play',
        timeReminder: 'Notice: The timer is paused.',
        section1: 'General',
        s1p1: 'Your goal is to form a path that connects two valves of a pipe.',
        s1p2: 'Spread across the grid you will find randomly placed pipe segments.',
        s1p3: 'The only move the player can make is to rotate the available segments.',
        s1p4: 'At 00:00 UTC a new grid will be generated for you to connect.',
        section2: 'Interface - Top panel',
        s2d1: 'Elapsed time.',
        s2d2: 'Movement counter.',
        s2d3: 'Open menu.',
        section3: 'Interface - Menu',
        s3d1: 'Change between the dark and light themes.',
        s3d2: 'Game history.',
        s3d3: 'Change language.',
        s3d4: 'Open this help dialog.',
        section4: 'Scoring',
        s4p1: 'The player\'s performance is evaluated by their time and amount of movements made.',
        s4p2: 'Each time a rotation is performed in any direction the movement counter is increased by 1.',
        s4p3: 'The timer doesn\'t stop until the two valves are connected and validated.',
        s4p4: 'If the player clicks the validation button and the validation doesn\'t pass, the movement counter is increased by 1.',
        section5: 'Interface - Pipes',
        s5d1: 'Straight pipe.',
        s5d2: 'Curved pipe.',
        s5d3: 'Valve. Two of them on each map. They cannot be rotated.',
        section6: 'Interface - Modifiers',
        s6d1: '(Advantage) Clocked time is reduced.',
        s6d2: '(Disadvantage) Clocked time is increased.',
        s6d3: '(Advantage) The movement counter is reduced.',
        s6d4: '(Disadvantage) The movement counter is increased.',
        sectionKb: 'Keyboard shortcuts',
        keyRLeft: 'X',
        descRLeft: 'Rotate block to the left.',
        keyRRight: 'C',
        descRRight: 'Rotate block to the right.',
        keyValid: 'Space',
        descValid: 'Validate connection.',
        keyUp: 'Up',
        descUp: 'Select next bock above.',
        keyRight: 'Right',
        descRight: 'Select next block to the right.',
        keyDown: 'Down',
        descDown: 'Select next block below.',
        keyLeft: 'Left',
        descLeft: 'Select next block to the left.',
    },

    history: {
        title: 'History',
        colDate: 'Date',
        colMoves: 'Moves',
        colTime: 'Time'
    },

    title: 'Tuble',

    menu: {
        darkMode: 'Dark mode',
        lightMode: 'Light mode',
        lang: 'Change language',
        history: 'History',
        help: 'How to play'
    },

    footer: {
        year: '© {year}',
        rights: 'All Rights Reserved.',
        source: 'Code on GitHub'
    }
}