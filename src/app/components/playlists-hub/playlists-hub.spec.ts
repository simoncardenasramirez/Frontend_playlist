import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistsHub } from './playlists-hub';

describe('PlaylistsHub', () => {
  let component: PlaylistsHub;
  let fixture: ComponentFixture<PlaylistsHub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistsHub]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistsHub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
