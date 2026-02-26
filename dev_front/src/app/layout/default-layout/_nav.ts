import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/admin/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },

  {
    name: 'Candidatures',
    url: '/admin/candidatures',
    iconComponent: { name: 'cil-clipboard' },
    children: [
      {
        name: 'Liste des candidatures',
        url: '/admin/candidatures',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Liste des candidats acceptés',
        url: '/admin/candidatures/acceptes',
        icon: 'nav-icon-bullet'
      }
    ]
    
  },
  {
    name: 'Candidats',
    url: '/admin/candidats',
    iconComponent: { name: 'cil-contact' },
  children: [
    {
      name: 'Liste des candidats',
      url: '/admin/candidats/list',
      icon: 'nav-icon-bullet'
    }
    // SUPPRIME ou COMMENTE cette ligne :
    // {
    //   name: 'Ajouter un candidat',
    //   url: '/candidats/add',
    //   icon: 'nav-icon-bullet'
    // }
  ]
  },
  {
    name: 'Concours',
    url: '/admin/concours',
    iconComponent: { name: 'cil-apps' },
    children: [
    
      {
        name: 'Ajouter un concours',
        url: '/admin/concours/add',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Liste des concours',
        url: '/admin/concours/adminConcoursList',
        icon: 'nav-icon-bullet'
      }
      // Tu pourras ajouter "Ajouter un concours" ou autres ici plus tard
    ]
  },
  
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'nav-icon-bullet'
      }
    ]
  },

];
