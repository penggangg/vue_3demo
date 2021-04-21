const path = require('path');
const fs = require('fs');
const getFolder = (path) => {
    const components = [];
    const files = fs.readdirSync(path);
    files.forEach(function(item) {
        const stat = fs.lstatSync(path + '/' + item);
        if (stat.isDirectory() === true) {
            components.push(path + '/' + item);
            components.push(...getFolder(path + '/' + item));
        }
    });
    return components;
};
module.exports = {
    description: '创建页面',
    prompts: [
        {
            type: 'list',
            name: 'fileType',
            message: '请选择创建类型',
            choices: [
                {
                    name: '文件',
                    value: 'file'
                },
                {
                    name: '文件夹',
                    value: 'folder'
                }
            ]
        },
        {
            type: 'confirm',
            name: 'isGlobal',
            message: '是否为全局组件',
            default: false
        },
        {
            type: 'list',
            name: 'path',
            message: '请选择页面创建目录',
            choices: ['src/components', ...getFolder('src/components')],
            when: function(answers) {
                return answers.fileType === 'file' && !answers.isGlobal;
            }
        },
        {
            type: 'list',
            name: 'path',
            message: '请选择目录创建文件夹',
            choices: ['src/components', ...getFolder('src/components')],
            when: function(answers) {
                return answers.fileType === 'folder' && !answers.isGlobal;
            }
        },
        {
            type: 'input',
            name: 'name',
            message: '请输入文件名',
            when: function(answers) {
                return answers.fileType === 'file';
            },
            validate: v => {
                if (!v || v.trim === '') {
                    return '文件名不能为空';
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'name',
            message: '请输入文件夹名',
            when: function(answers) {
                return answers.fileType === 'folder';
            },
            validate: v => {
                if (!v || v.trim === '') {
                    return '文件夹名不能为空';
                } else {
                    return true;
                }
            }
        }
    ],
    actions: data => {
        console.log(data);
        let actions = [];
        if (data.fileType === 'folder') {
            const rootPath = data.isGlobal ? 'src/components/global' : data.path;
            fs.mkdirSync(path.resolve(rootPath, data.name));
        } else {
            const rootPath = data.isGlobal ? 'src/components/global' : data.path;
            actions = [
                {
                    type: 'add',
                    path: `${rootPath}/{{properCase name}}.vue`,
                    templateFile: 'plop-templates/page/index.hbs',
                    data: {
                        componentName: `${data.name}`
                    }
                }
            ];
        }
        return actions;
    }
};
