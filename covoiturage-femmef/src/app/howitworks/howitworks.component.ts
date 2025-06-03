import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-howitworks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './howitworks.component.html',
  styleUrls: ['./howitworks.component.css']
})
export class HowItWorksComponent {
    public currentYear: number = new Date().getFullYear();
     constructor(private router: Router) {}

  steps = [
      {
      title: "Inscrivez-vous",
      description: "Créez un compte gratuit en quelques minutes. Vos données sont sécurisées et vérifiées pour garantir un environnement 100% féminin."
    },
    {
      title: "Trouvez ou proposez un trajet",
      description: "Recherchez un trajet qui correspond à vos besoins, ou proposez le vôtre en indiquant les détails (date, heure, itinéraire, etc.)."
    },
    {
      title: "Communiquez et confirmez",
      description: "Échangez avec vos compagnes de voyage via notre messagerie sécurisée et confirmez votre réservation en toute simplicité."
    },
    {
      title: "Voyagez ensemble",
      description: "Rencontrez votre conductrice ou vos passagères et profitez d'un trajet agréable, économique et respectueux de l'environnement."
    },
    {
      title: "Évaluez et recommandez",
      description: "Après le trajet, partagez votre expérience et contribuez à maintenir la qualité et la sécurité de notre communauté."
    }
  ];

  faqs = [
    {
      question: "Comment garantissez-vous que seules des femmes utilisent la plateforme ?",
      answer: "Nous utilisons un processus de vérification en plusieurs étapes qui inclut la validation des documents d’identité et une vérification par notre équipe."
    },
    {
      question: "Puis-je choisir mes compagnes de voyage ?",
      answer: "Oui, les conductrices peuvent accepter ou refuser les demandes de réservation. Les passagères peuvent consulter les profils et les avis avant de réserver."
    },
    {
      question: "Comment fonctionne l’assurance pendant les trajets ?",
      answer: "Tous les trajets sont couverts par notre assurance partenaire, qui complète l’assurance automobile de la conductrice pour une sécurité maximale."
    },
    {
      question: "Que se passe-t-il en cas d’annulation ?",
      answer: "Les annulations effectuées plus de 24h avant le départ ne sont pas pénalisées. Des frais peuvent s’appliquer en cas d’annulation tardive."
    },
    {
      question: "Comment se déroule le paiement ?",
      answer: "Le paiement s’effectue directement via l’application de manière sécurisée. Pour les conductrices, les gains sont versés 24h après la fin du trajet."
    }
  ];
   goToLogin() {
    this.router.navigate(['/auth/login']);
  }
  goToRecherche(){
    this.router.navigate(['/recherche']);
  }
}
