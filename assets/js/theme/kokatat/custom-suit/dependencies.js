const dependencies = {
    dsugmeconfig: {
        visual_dependencies: ['relief_zipper_cover', 'cordura_bottoms'],
        other_dependencies: ['relief_zipper', 'socks', 'size'],
        lower_alteration_dependencies: ['relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
            {
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            relief_zipper: [
                {
                    value: 'Yes',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'No',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: true,
                        },
                    },
                },
            ],
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'GORE-TEX',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dsupmerconfig: {
        visual_dependencies: ['relief_zipper', 'cordura_bottoms'],
        other_dependencies: ['relief_zipper', 'socks', 'size'],
        lower_alteration_dependencies: ['relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
            {
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            relief_zipper: [
                {
                    value: 'Yes',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'No',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: true,
                        },
                    },
                },
            ],
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'GORE-TEX',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dswgmeconfig: {
        visual_dependencies: ['relief_zipper_cover', 'cordura_bottoms'],
        other_dependencies: ['relief_zipper', 'socks', 'size'],
        lower_alteration_dependencies: ['drop_seat', 'relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                drop_seat: 'Yes',
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'GORE-TEX',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'GORE-TEX',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            relief_zipper: [
                {
                    value: 'Yes',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'No',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: true,
                        },
                    },
                },
            ],
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'GORE-TEX',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dswpmedconfig: {
        visual_dependencies: ['relief_zipper', 'drop_seat', 'cordura_bottoms'],
        other_dependencies: ['relief_zipper', 'socks', 'size'],
        lower_alteration_dependencies: ['drop_seat', 'relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                drop_seat: 'Yes',
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'GORE-TEX',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'GORE-TEX',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            relief_zipper: [
                {
                    value: 'Yes',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'No',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: true,
                        },
                    },
                },
            ],
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'GORE-TEX',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dswgoddconfig: {
        visual_dependencies: [],
        other_dependencies: ['socks', 'size'],
        lower_alteration_dependencies: ['drop_seat', 'relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                drop_seat: 'Yes',
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'GORE-TEX',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'GORE-TEX',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'GORE-TEX',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL Short',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dswpoddconfig: {
        visual_dependencies: ['drop_seat', 'relief_zipper'],
        other_dependencies: ['socks', 'size'],
        lower_alteration_dependencies: ['drop_seat', 'relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                drop_seat: 'Yes',
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'GORE-TEX',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'GORE-TEX',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'GORE-TEX',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL Short',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dsugodrconfig: {
        visual_dependencies: [],
        other_dependencies: ['socks', 'size'],
        lower_alteration_dependencies: ['relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
            {
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'GORE-TEX',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dsupodrconfig: {
        visual_dependencies: ['relief_zipper'],
        other_dependencies: ['socks', 'size'],
        lower_alteration_dependencies: ['relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
            {
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'GORE-TEX',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dsugrasconfig: {
        visual_dependencies: [],
        other_dependencies: ['size'],
        lower_alteration_dependencies: [],
        lower_alteration_cases: [],
        dependency_cases: {
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dswgrasconfig: {
        visual_dependencies: [],
        other_dependencies: ['size'],
        lower_alteration_dependencies: [],
        lower_alteration_cases: [],
        dependency_cases: {
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dsugidsconfig: {
        visual_dependencies: [],
        other_dependencies: ['size'],
        lower_alteration_dependencies: [],
        lower_alteration_cases: [],
        dependency_cases: {
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dsupidsconfig: {
        visual_dependencies: [],
        other_dependencies: ['size'],
        lower_alteration_dependencies: [],
        lower_alteration_cases: [],
        dependency_cases: {
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dswgidsconfig: {
        visual_dependencies: [],
        other_dependencies: ['size'],
        lower_alteration_dependencies: [],
        lower_alteration_cases: [],
        dependency_cases: {
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dswpidsconfig: {
        visual_dependencies: [],
        other_dependencies: ['size'],
        lower_alteration_dependencies: [],
        lower_alteration_cases: [],
        dependency_cases: {
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dsugicrconfig: {
        visual_dependencies: [],
        other_dependencies: ['size'],
        lower_alteration_dependencies: [],
        lower_alteration_cases: [],
        dependency_cases: {
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dsupicrconfig: {
        visual_dependencies: [],
        other_dependencies: ['size'],
        lower_alteration_dependencies: [],
        lower_alteration_cases: [],
        dependency_cases: {
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dswgicdconfig: {
        visual_dependencies: [],
        other_dependencies: ['size'],
        lower_alteration_dependencies: [],
        lower_alteration_cases: [],
        dependency_cases: {
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dswpicdconfig: {
        visual_dependencies: [],
        other_dependencies: ['size'],
        lower_alteration_dependencies: [],
        lower_alteration_cases: [],
        dependency_cases: {
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dsugfeconfig: {
        visual_dependencies: ['entry_zipper_cover', 'relief_zipper_cover', 'cordura_bottoms'],
        other_dependencies: ['relief_zipper', 'socks', 'size'],
        lower_alteration_dependencies: ['relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
            {
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            relief_zipper: [
                {
                    value: 'Yes',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'No',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: true,
                        },
                    },
                },
            ],
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'GORE-TEX',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dswgfeconfig: {
        visual_dependencies: ['entry_zipper_cover', 'relief_zipper_cover', 'cordura_bottoms'],
        other_dependencies: ['relief_zipper', 'socks', 'size'],
        lower_alteration_dependencies: ['drop_seat', 'relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                drop_seat: 'Yes',
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'GORE-TEX',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'GORE-TEX',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            relief_zipper: [
                {
                    value: 'Yes',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'No',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: true,
                        },
                    },
                },
            ],
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'GORE-TEX',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dsuplerconfig: {
        visual_dependencies: ['entry_zipper_cover', 'relief_zipper', 'relief_zipper_cover', 'cordura_bottoms'],
        other_dependencies: ['relief_zipper', 'socks', 'size'],
        lower_alteration_dependencies: ['relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
            {
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            relief_zipper: [
                {
                    value: 'Yes',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'No',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: true,
                        },
                    },
                },
            ],
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'GORE-TEX',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dswpledconfig: {
        visual_dependencies: ['entry_zipper_cover', 'relief_zipper', 'drop_seat', 'relief_zipper_cover', 'cordura_bottoms'],
        other_dependencies: ['relief_zipper', 'socks', 'size'],
        lower_alteration_dependencies: ['drop_seat', 'relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                drop_seat: 'Yes',
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'GORE-TEX',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'GORE-TEX',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            relief_zipper: [
                {
                    value: 'Yes',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'No',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: true,
                        },
                    },
                },
            ],
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'GORE-TEX',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dsupicrcon: {
        visual_dependencies: [],
        other_dependencies: ['size'],
        lower_alteration_dependencies: [],
        lower_alteration_cases: [],
        dependency_cases: {
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dswpicdcon: {
        visual_dependencies: [],
        other_dependencies: ['size'],
        lower_alteration_dependencies: [],
        lower_alteration_cases: [],
        dependency_cases: {
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dtwhstconfig: {
        visual_dependencies: ['relief_zipper', 'cordura_bottoms'],
        other_dependencies: ['relief_zipper', 'socks', 'size'],
        lower_alteration_dependencies: ['relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
            {
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            relief_zipper: [
                {
                    value: 'Yes',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'No',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: true,
                        },
                    },
                },
            ],
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'GORE-TEX',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dtuhstconfig: {
        visual_dependencies: ['relief_zipper', 'cordura_bottoms'],
        other_dependencies: ['relief_zipper', 'socks', 'size'],
        lower_alteration_dependencies: ['relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
            {
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            relief_zipper: [
                {
                    value: 'Yes',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'No',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: true,
                        },
                    },
                },
            ],
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'GORE-TEX',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dswfpmedconfig: {
        visual_dependencies: ['relief_zipper', 'cordura_bottoms'],
        other_dependencies: ['relief_zipper', 'socks', 'size'],
        lower_alteration_dependencies: ['relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
            {
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            relief_zipper: [
                {
                    value: 'Yes',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'No',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: true,
                        },
                    },
                },
            ],
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'GORE-TEX',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dsufpmerconfig: {
        visual_dependencies: ['relief_zipper', 'cordura_bottoms'],
        other_dependencies: ['relief_zipper', 'socks', 'size'],
        lower_alteration_dependencies: ['relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
            {
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            relief_zipper: [
                {
                    value: 'Yes',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'No',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: true,
                        },
                    },
                },
            ],
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'GORE-TEX',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dswfpledconfig: {
        visual_dependencies: ['relief_zipper', 'cordura_bottoms'],
        other_dependencies: ['relief_zipper', 'socks', 'size'],
        lower_alteration_dependencies: ['relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
            {
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            relief_zipper: [
                {
                    value: 'Yes',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'No',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: true,
                        },
                    },
                },
            ],
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'GORE-TEX',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dsufplerconfig: {
        visual_dependencies: ['relief_zipper', 'cordura_bottoms'],
        other_dependencies: ['relief_zipper', 'socks', 'size'],
        lower_alteration_dependencies: ['relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
            {
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            relief_zipper: [
                {
                    value: 'Yes',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'No',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: true,
                        },
                    },
                },
            ],
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'GORE-TEX',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dswfpoddconfig: {
        visual_dependencies: ['relief_zipper', 'cordura_bottoms'],
        other_dependencies: ['relief_zipper', 'socks', 'size'],
        lower_alteration_dependencies: ['relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
            {
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            relief_zipper: [
                {
                    value: 'Yes',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'No',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: true,
                        },
                    },
                },
            ],
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'GORE-TEX',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dsufpodrconfig: {
        visual_dependencies: ['relief_zipper', 'cordura_bottoms'],
        other_dependencies: ['relief_zipper', 'socks', 'size'],
        lower_alteration_dependencies: ['relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
            {
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            relief_zipper: [
                {
                    value: 'Yes',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'No',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: true,
                        },
                    },
                },
            ],
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'GORE-TEX',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dswfpicdconfig: {
        visual_dependencies: ['relief_zipper', 'cordura_bottoms'],
        other_dependencies: ['relief_zipper', 'socks', 'size'],
        lower_alteration_dependencies: ['relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
            {
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            relief_zipper: [
                {
                    value: 'Yes',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'No',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: true,
                        },
                    },
                },
            ],
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'GORE-TEX',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dsufpicrconfig: {
        visual_dependencies: ['relief_zipper', 'cordura_bottoms'],
        other_dependencies: ['relief_zipper', 'socks', 'size'],
        lower_alteration_dependencies: ['relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
            {
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            relief_zipper: [
                {
                    value: 'Yes',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'No',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: true,
                        },
                    },
                },
            ],
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'GORE-TEX',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dsuhseconfig: {
        visual_dependencies: ['relief_zipper', 'cordura_bottoms'],
        other_dependencies: ['relief_zipper', 'socks', 'size'],
        lower_alteration_dependencies: ['relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                relief_zipper: 'No',
                socks: 'Hydrus',
            },
            {
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                relief_zipper: 'No',
                socks: 'Hydrus',
            },
            {
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            relief_zipper: [
                {
                    value: 'Yes',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'No',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: true,
                        },
                    },
                },
            ],
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'Hydrus',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dswhmeconfig: {
        visual_dependencies: ['relief_zipper', 'drop_seat', 'cordura_bottoms'],
        other_dependencies: ['relief_zipper', 'socks', 'size'],
        lower_alteration_dependencies: ['drop_seat', 'relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                drop_seat: 'Yes',
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'No',
                socks: 'Hydrus',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'Hydrus',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'Hydrus',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'No',
                socks: 'Hydrus',
            },
        ],
        dependency_cases: {
            relief_zipper: [
                {
                    value: 'Yes',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'No',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: true,
                        },
                    },
                },
            ],
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'Hydrus',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dswhseconfig: {
        visual_dependencies: ['relief_zipper', 'drop_seat', 'cordura_bottoms'],
        other_dependencies: ['relief_zipper', 'socks', 'size'],
        lower_alteration_dependencies: ['drop_seat', 'relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                drop_seat: 'Yes',
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'No',
                socks: 'Hydrus',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'Hydrus',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'Hydrus',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'No',
                socks: 'Hydrus',
            },
        ],
        dependency_cases: {
            relief_zipper: [
                {
                    value: 'Yes',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'No',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: true,
                        },
                    },
                },
            ],
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'Hydrus',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dsuhmeconfig: {
        visual_dependencies: ['relief_zipper', 'cordura_bottoms'],
        other_dependencies: ['relief_zipper', 'socks', 'size'],
        lower_alteration_dependencies: ['relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                relief_zipper: 'No',
                socks: 'Hydrus',
            },
            {
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                relief_zipper: 'No',
                socks: 'Hydrus',
            },
            {
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            relief_zipper: [
                {
                    value: 'Yes',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'No',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: true,
                        },
                    },
                },
            ],
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'Hydrus',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dswhoddconfig: {
        visual_dependencies: ['relief_zipper', 'drop_seat'],
        other_dependencies: ['relief_zipper', 'socks', 'size'],
        lower_alteration_dependencies: ['relief_zipper', 'socks', 'drop_seat'],
        lower_alteration_cases: [
            {
                drop_seat: 'Yes',
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
            {
                drop_seat: 'Yes',
                relief_zipper: 'Yes',
                socks: 'GORE-TEX',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'Yes',
                socks: 'GORE-TEX',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                drop_seat: 'No',
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
        ],
        dependency_cases: {
            relief_zipper: [
                {
                    value: 'Yes',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'No',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: true,
                        },
                    },
                },
            ],
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'GORE-TEX',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dsuhodrconfig: {
        visual_dependencies: ['relief_zipper'],
        other_dependencies: ['relief_zipper', 'socks', 'size'],
        lower_alteration_dependencies: ['relief_zipper', 'socks'],
        lower_alteration_cases: [
            {
                relief_zipper: 'No',
                socks: 'None',
            },
            {
                relief_zipper: 'No',
                socks: 'GORE-TEX',
            },
            {
                relief_zipper: 'No',
                socks: 'Latex',
            },
            {
                relief_zipper: 'Yes',
                socks: 'None',
            },
            {
                relief_zipper: 'Yes',
                socks: 'GORE-TEX',
            },
            {
                relief_zipper: 'Yes',
                socks: 'Latex',
            },
        ],
        dependency_cases: {
            relief_zipper: [
                {
                    value: 'Yes',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'No',
                    rules: {
                        relief_zipper_cover: {
                            value: 'No',
                            disabled: true,
                        },
                    },
                },
            ],
            socks: [
                {
                    value: 'None',
                    rules: {
                        sock_size: {
                            value: '',
                            disabled: true,
                        },
                    },
                },
                {
                    value: 'GORE-TEX',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Latex',
                    rules: {
                        sock_size: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
            ],
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dswhicdconfig: {
        visual_dependencies: ['relief_zipper'],
        other_dependencies: ['size'],
        lower_alteration_dependencies: [],
        lower_alteration_cases: [],
        dependency_cases: {
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
    dsuhicrconfig: {
        visual_dependencies: [],
        other_dependencies: ['size'],
        lower_alteration_dependencies: [],
        lower_alteration_cases: [],
        dependency_cases: {
            size: [
                {
                    value: 'Small',
                    rules: {
                        wrist_gaskets: {
                            value: 'Small',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Small',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Medium',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'Large',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
                {
                    value: 'XXL',
                    rules: {
                        wrist_gaskets: {
                            value: 'Large',
                            disabled: false,
                        },
                        neck_gasket: {
                            value: 'Large',
                            disabled: false,
                        },
                    },
                },
            ],
        },
    },
};

export default dependencies;
