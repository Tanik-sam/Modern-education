class App {
    person = [
        {
            name: 'Иван Иванов',
            description: 'Senior Android Developer. Работал в Amazon Web services, Alibaba Group, Яндекс.',
        },
        {
            name: 'Анна Иванова',
            description:
                'Руководитель группы по работе с рекламными агенствами Вконтакте. Работала со Сбером, Яндексом, М-видио.',
        },
    ];

    start(): void {
        const container: HTMLElement | null = document.getElementById('person-container');
        const arrowRight = document.querySelector('.arrow_right');
        const arrowLeft = document.querySelector('.arrow_left');
        if (container) {
            container.innerHTML = '';
            this.createPerson();
        }
        const moveLeft = () => {
            container?.classList.add('transition-left');
            arrowLeft?.removeEventListener('click', moveLeft);
            /* eslint-disable */
            arrowRight?.removeEventListener('click', moveRight);
            /* eslint-disable */
        };

        const moveRight = () => {
            container?.classList.add('transition-right');
            arrowRight?.removeEventListener('click', moveRight);
            arrowLeft?.removeEventListener('click', moveLeft);
        };
        arrowLeft?.addEventListener('click', moveLeft);
        arrowRight?.addEventListener('click', moveRight);
        container?.addEventListener('animationend', (animationEvent) => {
            if (animationEvent.animationName === 'move-left') {
                container?.classList.remove('transition-left');
                this.createPerson();
            } else {
                container?.classList.remove('transition-right');
                this.createPerson();
            }
            arrowLeft?.addEventListener('click', moveLeft);
            arrowRight?.addEventListener('click', moveRight);
        });
    }

    createPerson(): void {
        const container: HTMLElement | null = document.getElementById('person-container');
        if (container) {
            container.innerHTML = '';
        }
        this.person.reverse();
        this.person.forEach((item) => {
            const fragment = document.createDocumentFragment() as DocumentFragment;
            const personData = document.querySelector('#templ1') as HTMLTemplateElement;
            const personClone = personData.content.cloneNode(true) as HTMLElement;
            (personClone.querySelector('h2') as HTMLElement).innerHTML = item.name;
            (personClone.querySelector('p') as HTMLElement).innerHTML = item.description;
            fragment.append(personClone);
            container?.append(fragment);
        });
    }
}

export default App;
