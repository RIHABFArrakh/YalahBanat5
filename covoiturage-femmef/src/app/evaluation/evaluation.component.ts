import { Component, Input, OnInit } from '@angular/core';
import { EvaluationService } from '../services/evaluation.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  evaluationForm!: FormGroup;
  voyageId!: string;
  passagerId!: string;
  conductriceId!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private evaluationService: EvaluationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.voyageId = this.route.snapshot.paramMap.get('voyageId')!;
    this.passagerId = this.route.snapshot.paramMap.get('passagerId')!;
    this.conductriceId = this.route.snapshot.paramMap.get('conductriceId')!;

    this.evaluationForm = this.fb.group({
      note: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      commentaire: ['', Validators.required]
    });
  }

  envoyerEvaluation(): void {
    if (this.evaluationForm.invalid) return;

    const evaluation = {
      note: this.evaluationForm.value.note,
      commentaire: this.evaluationForm.value.commentaire,
      passagerId: this.passagerId,
      conductriceId: this.conductriceId,
      voyageId: this.voyageId
    };

    this.evaluationService.ajouterEvaluation(evaluation).subscribe({
      next: () => {
        this.toastr.success('Évaluation envoyée avec succès', 'Succès');
        this.evaluationForm.reset();
      },
      error: () => {
        this.toastr.error("Erreur lors de l'envoi de l'évaluation", 'Erreur');
      }
    });
  }
}