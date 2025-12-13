import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskFormComponent } from './task-form.component';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TaskFormComponent,
        ReactiveFormsModule,
        IonicModule.forRoot(),
        BrowserAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.form.value.title).toBe('');
    expect(component.form.value.note).toBe('');
  });

  it('form should be invalid when empty', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('form should be invalid with short title', () => {
    component.form.patchValue({ title: 'ab' });
    expect(component.form.valid).toBeFalse();
  });

  it('form should be valid with proper title', () => {
    component.form.patchValue({ title: 'Valid Task' });
    expect(component.form.valid).toBeTrue();
  });

  it('should emit created event when form is valid', () => {
    spyOn(component.created, 'emit');
    
    component.form.patchValue({ title: 'New Task', note: 'Some note' });
    component.submit();
    
    expect(component.created.emit).toHaveBeenCalledWith({
      title: 'New Task',
      note: 'Some note'
    });
  });

  it('should reset form after successful submission', () => {
    component.form.patchValue({ title: 'Task to reset', note: 'Note' });
    component.submit();
    
    expect(component.form.value.title).toBe(null);
    expect(component.form.value.note).toBe(null);
  });

  it('should not emit when form is invalid', () => {
    spyOn(component.created, 'emit');
    
    component.form.patchValue({ title: 'ab' }); // too short
    component.submit();
    
    expect(component.created.emit).not.toHaveBeenCalled();
  });

  it('should mark all fields as touched when submitted invalid', () => {
    component.submit(); // form is empty and invalid
    
    expect(component.form.get('title')?.touched).toBeTrue();
  });

  it('note field should be optional', () => {
    component.form.patchValue({ title: 'Task without note' });
    expect(component.form.valid).toBeTrue();
  });
});
