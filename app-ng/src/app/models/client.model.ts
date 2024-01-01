
export interface Client {
  id: number;
  username: string;
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  role:any
  password: string;
  etat:boolean;
}
/*
 @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String nom;
    private String email;

    @OneToMany(mappedBy = "client",fetch = FetchType.EAGER)
    private List<Abonnement> abonnements;


 */
